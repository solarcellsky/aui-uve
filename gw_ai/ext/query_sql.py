from gw_ai.ext.dep import db


def query_st(sql):
    c = db.session.execute(sql)
    items = [dict(item) for item in c]
    if items is not None and len(items) > 0:
        return items[0]
    else:
        return None


def get_rows(sql):
    c = db.session.execute(sql)
    items = [dict(item) for item in c]
    return items


def get_row(cursor):
    for r in cursor:
        d = dict(r)
        break
    return d


# -- 获取全部数据
sql_list = '''
SELECT
	*
FROM
	new_loans
WHERE
	deleted=FALSE
ORDER BY
	period ASC;
'''

# -- 按期数合计
sql_period = '''
SELECT
	period,
	COALESCE ( SUM ( amount ), 0 ) AS sum 
FROM
	new_loans
WHERE
	deleted=FALSE
GROUP BY
	period 
ORDER BY
	period ASC;
'''

# -- 按出借方本金利息合计
sql_creditor = '''
SELECT
	creditor,
	COALESCE ( SUM ( CASE WHEN amount IS NOT NULL THEN amount ELSE 0 END ), 0 ) AS sum
FROM
	new_loans
WHERE
	deleted=FALSE 
GROUP BY
	creditor 
ORDER BY
	sum DESC;
'''

sql_summary = '''
SELECT 
	COALESCE ( SUM ( CASE WHEN amount IS NOT NULL THEN amount ELSE 0 END ), 0 ) AS 合计
FROM
	new_loans
WHERE
	deleted=FALSE;
'''

sql_month = '''
SELECT
	period,
	creditor,
	amount 
FROM
	new_loans
WHERE
	period = '{}' AND deleted=FALSE
ORDER BY
  amount ASC;
'''

sql_delete = '''
DELETE 
FROM
	new_loans 
WHERE
	id= '{}';
'''

sql_update = '''
UPDATE
	new_loans
SET
	deleted=TRUE
WHERE
	id= '{}';
'''
