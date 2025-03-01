from flask.views import MethodView
from flask_smorest import Blueprint
from gw_ai.ext.commons import rest
from openai import OpenAI

bp = Blueprint("ai", __name__, url_prefix="/ai", description="AI API")


@bp.route("")
class AiResource(MethodView):

    @bp.doc(description="Ai API")
    def get(self, params):

        # VITE_API_KEY = "sk-67556059568b41d9847249dab6869ca4"
        # VITE_PATH = "/chat/completions"
        # VITE_MODEL = "deepseek-chat"

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
                    "content": "Hello"
                },
            ],
            stream=False)

        return rest.success(data=response.choices[0].message.content)
