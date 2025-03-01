from flask import json
from flask_marshmallow import Marshmallow
from flask_smorest import Api
from flask_sqlalchemy import SQLAlchemy
from gw_ai.ext.base_model import Base

db = SQLAlchemy(session_options={
    'autoflush': True,
    'autocommit': False
},
                engine_options={'json_serializer': json.dumps})
ma = Marshmallow()
api = Api()

EXCLUDE_MODEL_ATTRS = ('id', 'createAt', 'updateAt', 'createBy', 'updateBy')
