import os
from telegram.ext import Updater, MessageHandler, Filters
from transformers import AutoTokenizer, AutoModelForCausalLM

# Variables de entorno (tu token Telegram y HF)
TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")  # tu token de bot Telegram
HF_TOKEN = os.getenv("HF_TOKEN")  # tu token Hugging Face

# Cargá tokenizer y modelo desde HF con autenticación
model_name = "carlosdimare/clascon"  # reemplazá con tu repo HF

tokenizer = AutoTokenizer.from_pretrained(model_name, use_auth_token=HF_TOKEN)
model = AutoModelForCausalLM.from_pretrained(model_name, use_auth_token=HF_TOKEN)

def responder(update, context):
    prompt = update.message.text
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=150)
    texto_generado = tokenizer.decode(outputs[0], skip_special_tokens=True)
    update.message.reply_text(texto_generado)

def main():
    updater = Updater(TELEGRAM_TOKEN, use_context=True)
    dp = updater.dispatcher
    dp.add_handler(MessageHandler(Filters.text & ~Filters.command, responder))
    updater.start_polling()
    updater.idle()

if __name__ == "__main__":
    main()
