import anthropic
import google.generativeai as genai
import requests

from dotenv import load_dotenv, find_dotenv
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferWindowMemory

#from django.http import JsonResponse

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

# Define function to build prompt based on expert count and selection
def build_ethician_prompt(query, experts):
    print("Experts being used: ", experts)
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
        "The question we will analyze is as follows, with responses structured as a dialogue from each expert's unique perspective: "
    ).format(", ".join(experts))
    return prompt + query

#================================================================================================================================================
#======================================================== GEMINI TEXT PROMPTING ================================================================
#================================================================================================================================================
def get_text_gemini(prompt, event=None):
    print("Gemini is speaking")
    text_response = []
    response = geminiChat.send_message(prompt, stream=True)
    for chunk in response:
        text_response.append(chunk.text)

    output = "".join(text_response)
    return {'output': output}

#================================================================================================================================================
#==================================================== CLAUDE TEXT PROMPTING ================================================================
#================================================================================================================================================
def get_text_claude(prompt, event=None):
    print("Claude is Speaking")
    message= claudeClient.messages.create(
        model="claude-3-5-sonnet-20240620",
        max_tokens=2048,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    output = message.content[0].text
    return {'output': output}


def process_text(query, selected_experts):
    print("The Selected Experts: ", selected_experts)
    expert_count = len(selected_experts)
    
    if expert_count == 0:
        return query  # No experts selected; return query as-is
    
    if "Ethician" in selected_experts:
        return build_ethician_prompt(query, selected_experts)
    else:
        # Build general expert dialogue without ETHICIAN-specific preamble
        return "We have gathered insights from the following experts: {}.\n\n{}".format(", ".join(selected_experts), query)

#===========================================================================================================================
#================================================= NO-FILE PROMPT HANDLING =================================================
#===========================================================================================================================
def textPrompt(prompt, currentLLM, selected_experts, *args, event=None):

    question2ask = process_text(prompt, selected_experts)
    print(currentLLM)

    #If the user wants to use Google Gemini on a regular, non-file-added text prompt
    if (currentLLM == "gemini-1.5-pro") or ('gemini' in question2ask) or ('Gemini' in question2ask):
        output = get_text_gemini(question2ask)
        return {'output': output}

    elif (currentLLM == "claude-3-5-sonnet"):
        output = get_text_claude(question2ask)
        return {'output': output}

    #If the user wants to use GPT-4 on a regular, non-file-added text prompt
    else:
        print("Made it to textPrompt: ", question2ask) 
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {'sk-proj-ZTxAIScEVS6VFHRNGeyGT3BlbkFJGHted3EXoBALDpLveTmy'}"
        }

        payload = {
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant. Help me with my queries to the best of your abilities!"},
                {"role": "user", "content": question2ask}
            ],
            "max_tokens": 2048
        }

        try:
            response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()
            output = data['choices'][0]['message']['content']
        except requests.exceptions.HTTPError as errh:
            print(f"Http Error: {errh}")
        except requests.exceptions.ConnectionError as errc:
            print(f"Error Connecting: {errc}")
        except requests.exceptions.Timeout as errt:
            print(f"Timeout Error: {errt}")
        except requests.exceptions.RequestException as err:
            print(f"Oops, something went wrong: {err}")
        
        return {'output': output}
