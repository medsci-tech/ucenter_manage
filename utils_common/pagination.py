# coding:utf-8
# 函数
# zhaiyu
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
import math

# 分页
def paginationForMime(**kwargs):
    data = kwargs.get('data')
    page = kwargs.get('page')
    request = kwargs.get('request')
    # 页码url连接
    href_str = '?'
    if request:
        for i in request:
            if i != 'page':
                href_str += i + '=' + request[i] + '&'
    if page:
        pageStart = int(page)  # 获取页码
    else:
        pageStart = 1

    limit = 20  # 每页显示的记录数

    try:
        pageSizeLength = int(kwargs.get('length'))  # 当前n页页码
    except Exception as e:
        pageSizeLength = 7  # 默认中间页数
    GetListPageCount = math.ceil(int(data.get('count')) / limit)  # 总页数
    print(GetListPageCount)
    page_pre = pageStart - math.floor(pageSizeLength / 2)
    page_next = pageStart + math.ceil(pageSizeLength / 2)
    assign_pageLengthNext = 0
    assign_pageLengthPrev = 0
    if (GetListPageCount > pageSizeLength):
        # 总条数大于中间n页
        assign_pageStart = page_pre if page_pre > 1 else 1
        assign_pageEnd = page_next if page_next < (GetListPageCount + 1) else (GetListPageCount + 1)
        if page_pre > 1:
            assign_pageLengthPrev = (pageStart - pageSizeLength) if pageStart - pageSizeLength > 1 else 1
        if page_next < GetListPageCount + 1:
            assign_pageLengthNext = (pageStart + pageSizeLength) if pageStart + pageSizeLength < GetListPageCount else GetListPageCount
        if page_pre <= 1:
            assign_pageEnd = pageSizeLength + 1
        if page_next >= GetListPageCount + 1:
            assign_pageStart = GetListPageCount + 1 - pageSizeLength
    else:
        assign_pageStart = 1
        assign_pageEnd = GetListPageCount + 1

    return {
        'page_previous_number': assign_pageLengthPrev,
        'page_next_number': assign_pageLengthNext,
        'page_last': GetListPageCount,
        'page_current': pageStart,
        'page_range': range(assign_pageStart, assign_pageEnd),
        'page_url': href_str,
    }
