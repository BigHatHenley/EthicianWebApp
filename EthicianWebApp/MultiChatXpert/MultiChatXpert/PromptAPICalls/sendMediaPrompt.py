import anthropic
import google.generativeai as genai
import requests
import pathlib

from dotenv import load_dotenv, find_dotenv
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferWindowMemory

from django.http import JsonResponse

from .textPrompt import get_text_claude, get_text_gemini


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


#Uploaded File Logic


def mediaPrompt(question2ask, currentLLM, event=None):
    global fileImg
    global b64Img
    global uploadedFile
    global language
    global file_type
    global fileText
    global mime_type
    global outputCopy

    if (currentLLM == "gemini-1.5-pro") or ('gemini' in question2ask) or ('Gemini' in question2ask):    #If Text File for Gemini
        if (file_type == 'txt') or (file_type == 'docx') or (file_type == 'pdf'):
            output = geminiChat.send_message(question2ask + fileText)
            outputCopy = output
            return {'output': output}
        else:               #If Media File for Gemini (Can't do it just yet, have a placeholder in the meantime)
            if (mime_type == "image/jpeg"):
                userFile = {
                    'mime_type': mime_type,
                    'data': pathlib.Path(uploadedFile).read_bytes()
                }
                output = geminiModelImage.generate_content([question2ask, userFile])
                outputCopy = output.text
                return output.text
            
            elif (mime_type == "image/png"):
                userFile = {
                    'mime_type': mime_type,
                    'data': pathlib.Path(uploadedFile).read_bytes()
                }
                output = geminiModelImage.generate_content([question2ask, userFile])
                outputCopy = output.text
                return output.text
            
            elif (mime_type == "image/webm"):
                userFile = {
                    'mime_type': mime_type,
                    'data': pathlib.Path(uploadedFile).read_bytes()
                }
                output = geminiModelImage.generate_content([question2ask, userFile])
                outputCopy = output.text
                return output.text
            
            elif (mime_type == "image/webp"):
                userFile = {
                    'mime_type': mime_type,
                    'data': pathlib.Path(uploadedFile).read_bytes()
                }
                output = geminiModelImage.generate_content([question2ask, userFile])
                outputCopy = output.text
                return output.text
            
            else:
                output = "Media Type not supported, please prompt again with a different file type!"
                outputCopy = output
                return output
    
    elif (currentLLM == "claude-3-5-sonnet"):
        if (file_type == 'txt') or (file_type == 'docx') or (file_type == 'pdf'):
            fullPrompt = question2ask + fileText
            output = get_text_claude(fullPrompt)
            outputCopy = output
            return {'output': output}
        else:
            if ('.jpg' in uploadedFile) or ('.jpeg' in uploadedFile):   #If Image file, check for each extension type and handle accordingly
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
                                        "media_type": "image/jpeg",
                                        "data": b64Img,
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
                return output
            elif ('.png' in uploadedFile):   #If Image file, check for each extension type and handle accordingly
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
                                        "media_type": "image/png",
                                        "data": b64Img,
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
                return output
            
            elif ('.webp' in uploadedFile):
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
                                        "media_type": "image/png",
                                        "data": b64Img,
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
                return output
            
            else:
                output = "Sorry, Claude does not support your submitted media's file type!"
                outputCopy = output
                return output
            
    else:   #If ANY file for GPT Prompt
        headers = { #Setup for Request to GPT
            "Content-Type": "application/json",
            "Authorization": f"Bearer {'sk-proj-ZTxAIScEVS6VFHRNGeyGT3BlbkFJGHted3EXoBALDpLveTmy'}"
        }

        if (file_type == 'txt') or (file_type == 'docx') or (file_type == 'pdf'):   #If just text, prompt directly like normal
            output = conversation.run(question2ask + fileText)
            outputCopy = output
            return {'output': output}

        if ('.jpg' in uploadedFile) or ('.jpeg' in uploadedFile):   #If Image file, check for each extension type and handle accordingly
            payload = {
                "model": "gpt-4o",
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", 
                            "text": question2ask
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{b64Img}",
                                    "detail": "auto"
                                }
                            }
                        ]
                    }
                ],
                "max_tokens": 765
            }

            output = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

            data = output.json()    #Receive output formatted as JSON

            content = data['choices'][0]['message']['content']  #Scrap the JSON for the text content the user wants
            outputCopy = content
            return content  #Send back to function for uploading it to the output window
        
        if '.png' in uploadedFile:  #Same process as jpg
            payload = {
                "model": "gpt-4o",
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", 
                            "text": question2ask
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/png;base64,{b64Img}",
                                    "detail": "auto"
                                }
                            }
                        ]
                    }
                ],
                "max_tokens": 765
            }

            output = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

            data = output.json()

            content = data['choices'][0]['message']['content']
            outputCopy = content
            return content
        
        if '.webm' in uploadedFile: #Same process as jpg
            payload = {
                "model": "gpt-4o",
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", 
                            "text": question2ask
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{b64Img}",
                                    "detail": "auto"
                                }
                            }
                        ]
                    }
                ],
                "max_tokens": 765
            }

            output = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

            data = output.json()

            content = data['choices'][0]['message']['content']
            outputCopy = content
            return content
