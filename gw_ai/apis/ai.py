from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint
from gw_ai.ext.commons import rest
from openai import OpenAI

bp = Blueprint("ai", __name__, url_prefix="/api/ai", description="AI API")


@bp.route("/deepseek")
class AiResource(MethodView):

    @bp.doc(description="Ai API")
    def post(self):
        message = request.json.get("message")

        client = OpenAI(api_key="sk-67556059568b41d9847249dab6869ca4",
                        base_url="https://api.deepseek.com")

        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant"
                },
                {
                    "role": "user",
                    "content": message
                },
            ],
            stream=False)

        return rest.success(data=response.choices[0].message.content)
