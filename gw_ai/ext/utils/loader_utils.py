import glob
from os.path import basename, isfile, dirname
from flask_smorest import Blueprint


def scan_module_names(module_init_file):
    _modules = glob.glob(f'{dirname(module_init_file)}/*.py')
    module_names = [basename(f)[:-3] for f in _modules if isfile(f) and not f.endswith('__init__.py')]

    return module_names


def register_module_apis(app, api, package_name, excluded=[], add_prefix=None):
    apis = __import__(package_name, fromlist=['__all__'])
    for module_name in apis.__all__:
        full_name = f'{package_name}.{module_name}'
        if full_name in excluded:
            continue
        module = __import__(full_name, fromlist=["bp"])
        url_prefix = module.bp.url_prefix
        if add_prefix is not None:
            url_prefix = f'{add_prefix}{url_prefix}'
        if isinstance(module.bp, Blueprint):
            api.register_blueprint(module.bp, url_prefix=url_prefix)
        else:
            app.register_blueprint(module.bp, url_prefix=url_prefix)
