def fill_children(roots, data):
    for item in roots:
        if not data.get(item['id'], None) is None:
            items = data.pop(item['id'])
            item['children'] = fill_children(items, data)

    return roots


def build_el_tree(items):
    '''
    构造element ui tree结构的数据
    '''
    roots = [item for item in items if item.get('parentId') == '0']
    children = [item for item in items if item.get('parentId') != '0']
    data = {}
    for c in children:
        parent_id = c.get('parentId')
        arr = data.get(parent_id, [])
        arr.append(c)
        data[parent_id] = arr
    roots = fill_children(roots, data)

    return roots
