import swagger_ui_assets
from flask import Blueprint, Flask, abort, request
from flask_cors import CORS
from gw_ai.ext.dep import db, ma, api
from gw_ai.ext.utils.loader_utils import register_module_apis


def create_app():
    app = Flask(__name__)
    app.config.from_object('gw_ai.settings')

    # init
    CORS(app)
    db.init_app(app)
    api.init_app(app)

    ext_modules = app.config.get('EXT_MODULES', [])
    excluded_apis = app.config.get('EXCLUDED_APIS', [])
    if len(ext_modules) > 0:
        for package_name in ext_modules:
            register_module_apis(app,
                                 api,
                                 package_name,
                                 excluded=excluded_apis)

    bp_swagger = Blueprint('swagger_asset',
                           __name__,
                           static_folder=swagger_ui_assets.asset_path(),
                           static_url_path='/swagger-ui-assets')
    app.register_blueprint(bp_swagger)

    return app
