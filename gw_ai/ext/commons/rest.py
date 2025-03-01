from flask import jsonify, abort

from gw_ai.ext.commons.errors import BaseError

OK_CODE = 0
OK_MSG = 'ok'


def abort_error(error: BaseError):
    rv = error.to_dict()
    abort(error.code, jsonify(rv))


def success(**kwargs):
    rv = kwargs
    rv['code'] = OK_CODE
    rv['message'] = OK_MSG

    return jsonify(rv)


def fail_error(error: BaseError):
    rv = error.to_dict()
    return jsonify(rv)


def pager(pager):
    return {'total': pager.total, 'page': pager.page, 'limit': pager.per_page}
