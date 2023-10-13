import type { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/editor/explain',
        method: 'post',
        response: ({ body }) => {
            const json = `
            {
                "from": 0,
                "size": 0,
                "_source": {
                    "includes": [
                        "date",
                        "COUNT"
                    ],
                    "excludes": []
                },
                "stored_fields": "date",
                "aggregations": {
                    "date": {
                        "terms": {
                            "field": "date",
                            "size": 200,
                            "min_doc_count": 1,
                            "shard_min_doc_count": 0,
                            "show_term_doc_count_error": false,
                            "order": [
                                {
                                    "_count": "desc"
                                },
                                {
                                    "_term": "asc"
                                }
                            ]
                        },
                        "aggregations": {
                            "COUNT(*)": {
                                "value_count": {
                                    "field": "_index"
                                }
                            }
                        }
                    }
                }
            }
            `
            const dslVO = { status: 200, body: JSON.parse(json) }
            return { code: 200, msg: 'success', time: 0, data: dslVO }
        }
    }
] as MockMethod[]