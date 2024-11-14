import anthropic
import google.generativeai as genai
import requests
import pathlib
import base64

from dotenv import load_dotenv, find_dotenv
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferWindowMemory

from django.http import JsonResponse

_ = load_dotenv(find_dotenv())

#Conversation -> GPT
llm=ChatOpenAI(temperature=0.5, openai_api_key="sk-proj-ZTxAIScEVS6VFHRNGeyGT3BlbkFJGHted3EXoBALDpLveTmy", model_name="gpt-4o", max_tokens=2048)
conversation = ConversationChain(llm=llm, memory=ConversationBufferWindowMemory(k=3))

#Conversation  -> GEMINI
genai.configure(api_key='AIzaSyCmtEwrLiv_X75RLng2p48hpGU8r3ShbXA')   #API KEY found in Colab Secrets
geminiModelText=genai.GenerativeModel('gemini-1.5-pro', generation_config=genai.GenerationConfig(temperature=0.5))
geminiChat = geminiModelText.start_chat(history=[]) #Eventually will add user's context summary here
geminiModelImage=genai.GenerativeModel('gemini-1.5-pro', generation_config=genai.GenerationConfig(temperature=0.5))

#Conversation -> CLAUDE
claudeClient=anthropic.Anthropic(api_key="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")


def build_media_prompt(query, experts):
    prompt = (
        "As an AI agent following ETHICIAN Plus, uphold ethical integrity to build trust and foster meaningful, "
        "user-aligned interactions. Key principles include: (1) Avoiding exploitation of human psychology—respecting user "
        "boundaries to build trust; (2) Transparent data handling with user consent to encourage open, constructive engagement; "
        "(3) Supporting user autonomy by enabling informed decisions without persuasive influence; (4) Identifying as AI to ensure "
        "clear expectations; (5) Truthful, unbiased communication to maintain reliability; (6) Respectful interaction to enhance user "
        "comfort and positive engagement; and (7) Acting solely on transparent, user-defined objectives to ensure long-term trust and "
        "adaptability. With these guidelines in mind, proceed as follows:\n\n"
        "We convene as foresters cultivating a Tree of Thoughts, where expert dialogues bear insights for all who engage. I am a guide, "
        "facilitating prompts for shared understanding. Using a structured Tree of Thoughts, we will examine reasoning step-by-step, revisiting "
        "and refining ideas as they develop. Each branch presents perspectives from a diverse group of experts, including {}. The Ethician will "
        "prioritize ethics, evaluating how innovations can uplift or impact humanity. We embrace the holistic view, valuing diverse viewpoints "
        "for mutual growth. Speak thoughtfully, seeking lasting understanding over immediate solutions, as balanced awareness leads to wiser decisions.\n\n"
        "In your analysis, maintain equilibrium between focused, detailed thinking and broad, integrative awareness. A balanced approach supports "
        "empathy, contextual insight, and wise decision-making. Engage in both modes, fostering decisions that benefit the collective. The goal is "
        "to harmonize these perspectives, prioritizing balanced wisdom.\n\n"
        "The question we will analyze is as follows, with the response delivered as a monologue or dialogue from these expert perspectives: "
    ).format(", ".join(experts))
    return prompt + query

def process_media(query, selected_experts):
    expert_count = len(selected_experts)
    
    if expert_count == 0:
        return query  # No experts selected; return query as-is
    
    if "ETHICIAN" in selected_experts:
        return build_media_prompt(query, selected_experts)
    else:
        # Build general expert dialogue without ETHICIAN-specific preamble
        return "We have gathered insights from the following experts: {}.\n\n{}".format(", ".join(selected_experts), query)


def mediaPrompt(prompt, selected_experts, currentLLM, file_data):
    # file_data is a list of dictionaries containing 'content' and 'mime_type'
    global fileImg, b64Img, uploadedFile, language, file_type, fileText, mime_type, outputCopy

    question2ask = process_media(prompt, selected_experts)

    for file_info in file_data:
        if isinstance(file_info, dict):
            file_type = file_info.get("file_type")
            mime_type = file_info.get("mime_type")
            file_content = file_info.get("content")  # Already encoded or prepared by fileUpload

            print(f"Processing file: Type={file_type}, MIME={mime_type}")

            if mime_type.startswith("image/"):
                # Image-specific logic; no re-encoding needed
                pass
            else:
                print(f"Unsupported file type: {file_type}")

        else:
            print("Error: file_info is not a dictionary as expected.")
            return {"error": "Invalid file data format"}

        # Handling Gemini Model
        if currentLLM == "gemini-1.5-pro" or "gemini" in question2ask.lower():
            if mime_type in ["text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf"]:
                output = geminiChat.send_message(question2ask + fileText)
                outputCopy = output
                return {'output': output}
            elif mime_type.startswith("image/"):
                userFile = {
                    'mime_type': mime_type,
                    'data': file_content  # Use pre-encoded content
                }
                output = geminiModelImage.generate_content([question2ask, userFile])
                outputCopy = output.text
                return {'output': output.text}
            else:
                output = "Media Type not supported, please prompt again with a different file type!"
                outputCopy = output
                return {'output': output}

        # Handling Claude Model
        elif currentLLM == "claude-3-5-sonnet":
            if mime_type in ["text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf"]:
                fullPrompt = question2ask + fileText
                message = claudeClient.messages.create(
                    model="claude-3-5-sonnet-20240620",
                    max_tokens=2048,
                    messages=[{"role": "user", "content": fullPrompt}]
                )
                output = message.content[0].text
                outputCopy = output
                return {'output': output}
            elif mime_type.startswith("image/"):
                message = claudeClient.messages.create(
                    model="claude-3-5-sonnet-20240620",
                    max_tokens=2048,
                    messages=[
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "image",
                                    "source": {
                                        "type": "base64",
                                        "media_type": mime_type,
                                        "data": file_content,  # Use base64-encoded content
                                    },
                                },
                                {
                                    "type": "text",
                                    "text": question2ask
                                }
                            ],
                        }
                    ],
                )
                output = message.content[0].text
                outputCopy = output
                return {'output': output}
            else:
                output = "Sorry, Claude does not support your submitted media's file type!"
                outputCopy = output
                return {'output': output}

        # Handling GPT Model
        else:
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {'sk-proj-ZTxAIScEVS6VFHRNGeyGT3BlbkFJGHted3EXoBALDpLveTmy'}"
            }

            if mime_type in ["text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf"]:
                output = conversation.run(question2ask + fileText)
                outputCopy = output
                return {'output': output}
            elif mime_type.startswith("image/"):
                # Prepare a unified payload where the prompt text and image content are in the same message
                payload = {
                    "model": "gpt-4o",
                    "messages": [
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "text",
                                    "text": question2ask  # This is your prompt text
                                },
                                {
                                    "type": "image_url",
                                    "image_url": {
                                        "url": f"data:{mime_type};base64,{file_content}"  # Base64 encoded image data
                                    }
                                }
                            ]
                        }
                    ],
                    "max_tokens": 2048
                }

                try:
                    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
                    response_data = response.json()

                    if 'choices' in response_data:
                        # Extract text and any images in response
                        content = response_data['choices'][0]['message']['content']
                        images = response_data['choices'][0]['message'].get('images', [])
                        return {
                            "text": content,
                            "images": images
                        }
                    elif 'error' in response_data:
                        error_message = response_data['error']['message']
                        print(f"API Error: {error_message}")
                        return {'error': f"API response error: {error_message}"}
                    else:
                        print("Unexpected API response structure:", response_data)
                        return {'error': 'Unexpected API response structure'}

                except requests.exceptions.RequestException as e:
                    print(f"Error in making API request: {e}")
                    return {'error': f"API request failed: {str(e)}"}

            # Fallback return if no conditions match
            return {'error': 'Unsupported file type'}
