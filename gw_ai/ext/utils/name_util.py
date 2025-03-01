import re


def snake_to_camel(name):
    return re.sub(r'_([a-z])', lambda m: m.group(1).upper(), name)


def camel_to_snake(name):
    return re.sub(r'([A-Z])', lambda m: '_' + m.group(1).lower(), name)


def snake_to_upper_camel(name):
    camel = snake_to_camel(name)
    return camel[0].upper() + camel[1:]
