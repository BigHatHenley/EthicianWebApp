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

#===========================================================================================================================
#================================================= NO-FILE PROMPT HANDLING =================================================
#===========================================================================================================================
def textPrompt(question2ask, currentLLM, *args, event=None):

    #If the user wants to use Google Gemini on a regular, non-file-added text prompt
    if (currentLLM == "gemini-1.5-pro") or ('gemini' in question2ask) or ('Gemini' in question2ask):
        output = get_text_gemini(question2ask)
        return {'output': output}

    elif (currentLLM == "claude-3-5-sonnet"):
        output = get_text_claude(question2ask)
        return {'output': output}

    #If the user wants to use GPT-4 on a regular, non-file-added text prompt
    else:
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
