from flask import current_app
from pysmx import SM2


def gen_sm2_keys():
    keys = SM2.generate_keypair(64)
    k = keys.privateKey.hex()
    pk = '04' + keys.publicKey.hex()

    return k, pk


def is_blank(str):
    return str is None or str.strip() == ''


def sm2_decode(str_hex):
    enable = current_app.config.get('SM_ENABLE', True)
    if not enable or is_blank(str_hex):
        return str_hex

    key = current_app.config.get('SM2_KEY', '')
    return bytes.decode(SM2.Decrypt(str_hex, key, 64), 'utf-8')
