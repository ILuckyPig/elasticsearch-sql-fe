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
    },
    {
        url: '/editor/query',
        method: 'post',
        response: ({ body }) => {
            const columns = [
                { label: 'date', prop: 'f0' },
                { label: 'market', prop: 'f1' },
                { label: 'id', prop: 'f2' },
                { label: 'COUNT(*)', prop: 'f3' },
                { label: 'ma', prop: 'f4' },
                { label: 'mi', prop: 'f5' },
                { label: 's', prop: 'f6' }
            ]
            const tableData = [
                { f0: '20230101', f1: 'usa', f2: '1', f3: '10', f4: '100', f5: '0', f6: '133' },
                { f0: '20230101', f1: 'kr', f2: '2', f3: '22', f4: '212', f5: '0', f6: '233' },
                { f0: '20230101', f1: 'cn', f2: '3', f3: '33', f4: '313', f5: '0', f6: '333' },
                { f0: '20230101', f1: 'jp', f2: '4', f3: '34', f4: '414', f5: '0', f6: '433' },
                { f0: '20230102', f1: 'usa', f2: '1', f3: '11', f4: '101', f5: '1', f6: '231' },
                { f0: '20230103', f1: 'usa', f2: '1', f3: '12', f4: '102', f5: '2', f6: '232' },
                { f0: '20230104', f1: 'usa', f2: '1', f3: '13', f4: '103', f5: '3', f6: '233' },
                { f0: '20230105', f1: 'usa', f2: '1', f3: '14', f4: '104', f5: '0', f6: '234' },
                { f0: '20230106', f1: 'usa', f2: '1', f3: '15', f4: '105', f5: '4', f6: '235' },
                { f0: '20230107', f1: 'usa', f2: '1', f3: '16', f4: '106', f5: '5', f6: '236' },
                { f0: '20230108', f1: 'usa', f2: '1', f3: '17', f4: '107', f5: '0', f6: '237' },
                { f0: '20230109', f1: 'usa', f2: '1', f3: '18', f4: '108', f5: '6', f6: '238' },
                { f0: '20230110', f1: 'usa', f2: '1', f3: '19', f4: '109', f5: '7', f6: '239' },
                { f0: '20230111', f1: 'usa', f2: '1', f3: '10', f4: '110', f5: '8', f6: '240' }
            ]
            return { code: 200, msg: 'success', time: 0, data: { columns: columns, tableData: tableData } }
        }
    }
] as MockMethod[]