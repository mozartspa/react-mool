module.exports = {
    "scalars": [
        1,
        3,
        4,
        5,
        6,
        7,
        9
    ],
    "types": {
        "Query": {
            "Customer": [
                2,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "allCustomers": [
                2,
                {
                    "page": [
                        6
                    ],
                    "perPage": [
                        6
                    ],
                    "sortField": [
                        3
                    ],
                    "sortOrder": [
                        3
                    ],
                    "filter": [
                        13
                    ]
                }
            ],
            "_allCustomersMeta": [
                14,
                {
                    "page": [
                        6
                    ],
                    "perPage": [
                        6
                    ],
                    "filter": [
                        13
                    ]
                }
            ],
            "Category": [
                12,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "allCategories": [
                12,
                {
                    "page": [
                        6
                    ],
                    "perPage": [
                        6
                    ],
                    "sortField": [
                        3
                    ],
                    "sortOrder": [
                        3
                    ],
                    "filter": [
                        15
                    ]
                }
            ],
            "_allCategoriesMeta": [
                14,
                {
                    "page": [
                        6
                    ],
                    "perPage": [
                        6
                    ],
                    "filter": [
                        15
                    ]
                }
            ],
            "Product": [
                11,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "allProducts": [
                11,
                {
                    "page": [
                        6
                    ],
                    "perPage": [
                        6
                    ],
                    "sortField": [
                        3
                    ],
                    "sortOrder": [
                        3
                    ],
                    "filter": [
                        16
                    ]
                }
            ],
            "_allProductsMeta": [
                14,
                {
                    "page": [
                        6
                    ],
                    "perPage": [
                        6
                    ],
                    "filter": [
                        16
                    ]
                }
            ],
            "Command": [
                8,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "allCommands": [
                8,
                {
                    "page": [
                        6
                    ],
                    "perPage": [
                        6
                    ],
                    "sortField": [
                        3
                    ],
                    "sortOrder": [
                        3
                    ],
                    "filter": [
                        17
                    ]
                }
            ],
            "_allCommandsMeta": [
                14,
                {
                    "page": [
                        6
                    ],
                    "perPage": [
                        6
                    ],
                    "filter": [
                        17
                    ]
                }
            ],
            "Review": [
                10,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "allReviews": [
                10,
                {
                    "page": [
                        6
                    ],
                    "perPage": [
                        6
                    ],
                    "sortField": [
                        3
                    ],
                    "sortOrder": [
                        3
                    ],
                    "filter": [
                        18
                    ]
                }
            ],
            "_allReviewsMeta": [
                14,
                {
                    "page": [
                        6
                    ],
                    "perPage": [
                        6
                    ],
                    "filter": [
                        18
                    ]
                }
            ],
            "Setting": [
                19,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "allSettings": [
                19,
                {
                    "page": [
                        6
                    ],
                    "perPage": [
                        6
                    ],
                    "sortField": [
                        3
                    ],
                    "sortOrder": [
                        3
                    ],
                    "filter": [
                        20
                    ]
                }
            ],
            "_allSettingsMeta": [
                14,
                {
                    "page": [
                        6
                    ],
                    "perPage": [
                        6
                    ],
                    "filter": [
                        20
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "ID": {},
        "Customer": {
            "id": [
                1
            ],
            "first_name": [
                3
            ],
            "last_name": [
                3
            ],
            "email": [
                3
            ],
            "address": [
                3
            ],
            "zipcode": [
                3
            ],
            "city": [
                3
            ],
            "avatar": [
                3
            ],
            "birthday": [
                3
            ],
            "first_seen": [
                4
            ],
            "last_seen": [
                4
            ],
            "has_ordered": [
                5
            ],
            "latest_purchase": [
                3
            ],
            "has_newsletter": [
                5
            ],
            "groups": [
                3
            ],
            "nb_commands": [
                6
            ],
            "total_spent": [
                7
            ],
            "Commands": [
                8
            ],
            "Reviews": [
                10
            ],
            "__typename": [
                3
            ]
        },
        "String": {},
        "Date": {},
        "Boolean": {},
        "Int": {},
        "Float": {},
        "Command": {
            "id": [
                1
            ],
            "reference": [
                3
            ],
            "date": [
                4
            ],
            "customer_id": [
                1
            ],
            "basket": [
                9
            ],
            "total_ex_taxes": [
                7
            ],
            "delivery_fees": [
                7
            ],
            "tax_rate": [
                7
            ],
            "taxes": [
                7
            ],
            "total": [
                7
            ],
            "status": [
                3
            ],
            "returned": [
                5
            ],
            "Customer": [
                2
            ],
            "Reviews": [
                10
            ],
            "__typename": [
                3
            ]
        },
        "JSON": {},
        "Review": {
            "id": [
                1
            ],
            "date": [
                4
            ],
            "status": [
                3
            ],
            "command_id": [
                1
            ],
            "product_id": [
                1
            ],
            "customer_id": [
                1
            ],
            "rating": [
                6
            ],
            "comment": [
                3
            ],
            "Command": [
                8
            ],
            "Product": [
                11
            ],
            "Customer": [
                2
            ],
            "__typename": [
                3
            ]
        },
        "Product": {
            "id": [
                1
            ],
            "category_id": [
                1
            ],
            "reference": [
                3
            ],
            "width": [
                7
            ],
            "height": [
                7
            ],
            "price": [
                7
            ],
            "thumbnail": [
                3
            ],
            "image": [
                3
            ],
            "description": [
                3
            ],
            "stock": [
                6
            ],
            "Category": [
                12
            ],
            "Reviews": [
                10
            ],
            "__typename": [
                3
            ]
        },
        "Category": {
            "id": [
                1
            ],
            "name": [
                3
            ],
            "Products": [
                11
            ],
            "__typename": [
                3
            ]
        },
        "CustomerFilter": {
            "q": [
                3
            ],
            "ids": [
                1
            ],
            "id": [
                1
            ],
            "first_name": [
                3
            ],
            "last_name": [
                3
            ],
            "email": [
                3
            ],
            "address": [
                3
            ],
            "zipcode": [
                3
            ],
            "city": [
                3
            ],
            "avatar": [
                3
            ],
            "birthday": [
                3
            ],
            "first_seen": [
                4
            ],
            "last_seen": [
                4
            ],
            "has_ordered": [
                5
            ],
            "latest_purchase": [
                3
            ],
            "has_newsletter": [
                5
            ],
            "groups": [
                3
            ],
            "nb_commands": [
                6
            ],
            "total_spent": [
                7
            ],
            "id_neq": [
                1
            ],
            "first_name_neq": [
                3
            ],
            "last_name_neq": [
                3
            ],
            "email_neq": [
                3
            ],
            "address_neq": [
                3
            ],
            "zipcode_neq": [
                3
            ],
            "city_neq": [
                3
            ],
            "avatar_neq": [
                3
            ],
            "birthday_neq": [
                3
            ],
            "first_seen_lt": [
                4
            ],
            "first_seen_lte": [
                4
            ],
            "first_seen_gt": [
                4
            ],
            "first_seen_gte": [
                4
            ],
            "first_seen_neq": [
                4
            ],
            "last_seen_lt": [
                4
            ],
            "last_seen_lte": [
                4
            ],
            "last_seen_gt": [
                4
            ],
            "last_seen_gte": [
                4
            ],
            "last_seen_neq": [
                4
            ],
            "latest_purchase_neq": [
                3
            ],
            "groups_neq": [
                3
            ],
            "nb_commands_lt": [
                6
            ],
            "nb_commands_lte": [
                6
            ],
            "nb_commands_gt": [
                6
            ],
            "nb_commands_gte": [
                6
            ],
            "nb_commands_neq": [
                6
            ],
            "total_spent_lt": [
                7
            ],
            "total_spent_lte": [
                7
            ],
            "total_spent_gt": [
                7
            ],
            "total_spent_gte": [
                7
            ],
            "total_spent_neq": [
                7
            ],
            "__typename": [
                3
            ]
        },
        "ListMetadata": {
            "count": [
                6
            ],
            "__typename": [
                3
            ]
        },
        "CategoryFilter": {
            "q": [
                3
            ],
            "ids": [
                1
            ],
            "id": [
                1
            ],
            "name": [
                3
            ],
            "id_neq": [
                1
            ],
            "name_neq": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ProductFilter": {
            "q": [
                3
            ],
            "ids": [
                1
            ],
            "id": [
                1
            ],
            "category_id": [
                1
            ],
            "reference": [
                3
            ],
            "width": [
                7
            ],
            "height": [
                7
            ],
            "price": [
                7
            ],
            "thumbnail": [
                3
            ],
            "image": [
                3
            ],
            "description": [
                3
            ],
            "stock": [
                6
            ],
            "id_neq": [
                1
            ],
            "category_id_neq": [
                1
            ],
            "reference_neq": [
                3
            ],
            "width_lt": [
                7
            ],
            "width_lte": [
                7
            ],
            "width_gt": [
                7
            ],
            "width_gte": [
                7
            ],
            "width_neq": [
                7
            ],
            "height_lt": [
                7
            ],
            "height_lte": [
                7
            ],
            "height_gt": [
                7
            ],
            "height_gte": [
                7
            ],
            "height_neq": [
                7
            ],
            "price_lt": [
                7
            ],
            "price_lte": [
                7
            ],
            "price_gt": [
                7
            ],
            "price_gte": [
                7
            ],
            "price_neq": [
                7
            ],
            "thumbnail_neq": [
                3
            ],
            "image_neq": [
                3
            ],
            "description_neq": [
                3
            ],
            "stock_lt": [
                6
            ],
            "stock_lte": [
                6
            ],
            "stock_gt": [
                6
            ],
            "stock_gte": [
                6
            ],
            "stock_neq": [
                6
            ],
            "__typename": [
                3
            ]
        },
        "CommandFilter": {
            "q": [
                3
            ],
            "ids": [
                1
            ],
            "id": [
                1
            ],
            "reference": [
                3
            ],
            "date": [
                4
            ],
            "customer_id": [
                1
            ],
            "basket": [
                9
            ],
            "total_ex_taxes": [
                7
            ],
            "delivery_fees": [
                7
            ],
            "tax_rate": [
                7
            ],
            "taxes": [
                7
            ],
            "total": [
                7
            ],
            "status": [
                3
            ],
            "returned": [
                5
            ],
            "id_neq": [
                1
            ],
            "reference_neq": [
                3
            ],
            "date_lt": [
                4
            ],
            "date_lte": [
                4
            ],
            "date_gt": [
                4
            ],
            "date_gte": [
                4
            ],
            "date_neq": [
                4
            ],
            "customer_id_neq": [
                1
            ],
            "basket_neq": [
                9
            ],
            "total_ex_taxes_lt": [
                7
            ],
            "total_ex_taxes_lte": [
                7
            ],
            "total_ex_taxes_gt": [
                7
            ],
            "total_ex_taxes_gte": [
                7
            ],
            "total_ex_taxes_neq": [
                7
            ],
            "delivery_fees_lt": [
                7
            ],
            "delivery_fees_lte": [
                7
            ],
            "delivery_fees_gt": [
                7
            ],
            "delivery_fees_gte": [
                7
            ],
            "delivery_fees_neq": [
                7
            ],
            "tax_rate_lt": [
                7
            ],
            "tax_rate_lte": [
                7
            ],
            "tax_rate_gt": [
                7
            ],
            "tax_rate_gte": [
                7
            ],
            "tax_rate_neq": [
                7
            ],
            "taxes_lt": [
                7
            ],
            "taxes_lte": [
                7
            ],
            "taxes_gt": [
                7
            ],
            "taxes_gte": [
                7
            ],
            "taxes_neq": [
                7
            ],
            "total_lt": [
                7
            ],
            "total_lte": [
                7
            ],
            "total_gt": [
                7
            ],
            "total_gte": [
                7
            ],
            "total_neq": [
                7
            ],
            "status_neq": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ReviewFilter": {
            "q": [
                3
            ],
            "ids": [
                1
            ],
            "id": [
                1
            ],
            "date": [
                4
            ],
            "status": [
                3
            ],
            "command_id": [
                1
            ],
            "product_id": [
                1
            ],
            "customer_id": [
                1
            ],
            "rating": [
                6
            ],
            "comment": [
                3
            ],
            "id_neq": [
                1
            ],
            "date_lt": [
                4
            ],
            "date_lte": [
                4
            ],
            "date_gt": [
                4
            ],
            "date_gte": [
                4
            ],
            "date_neq": [
                4
            ],
            "status_neq": [
                3
            ],
            "command_id_neq": [
                1
            ],
            "product_id_neq": [
                1
            ],
            "customer_id_neq": [
                1
            ],
            "rating_lt": [
                6
            ],
            "rating_lte": [
                6
            ],
            "rating_gt": [
                6
            ],
            "rating_gte": [
                6
            ],
            "rating_neq": [
                6
            ],
            "comment_neq": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "Setting": {
            "id": [
                1
            ],
            "configuration": [
                9
            ],
            "__typename": [
                3
            ]
        },
        "SettingFilter": {
            "q": [
                3
            ],
            "ids": [
                1
            ],
            "id": [
                1
            ],
            "configuration": [
                9
            ],
            "id_neq": [
                1
            ],
            "configuration_neq": [
                9
            ],
            "__typename": [
                3
            ]
        },
        "Mutation": {
            "createCustomer": [
                2,
                {
                    "first_name": [
                        3,
                        "String!"
                    ],
                    "last_name": [
                        3,
                        "String!"
                    ],
                    "email": [
                        3,
                        "String!"
                    ],
                    "address": [
                        3
                    ],
                    "zipcode": [
                        3
                    ],
                    "city": [
                        3
                    ],
                    "avatar": [
                        3,
                        "String!"
                    ],
                    "birthday": [
                        3
                    ],
                    "first_seen": [
                        4,
                        "Date!"
                    ],
                    "last_seen": [
                        4,
                        "Date!"
                    ],
                    "has_ordered": [
                        5,
                        "Boolean!"
                    ],
                    "latest_purchase": [
                        3
                    ],
                    "has_newsletter": [
                        5,
                        "Boolean!"
                    ],
                    "groups": [
                        3,
                        "[String]!"
                    ],
                    "nb_commands": [
                        6,
                        "Int!"
                    ],
                    "total_spent": [
                        7,
                        "Float!"
                    ]
                }
            ],
            "createManyCustomer": [
                2,
                {
                    "data": [
                        22,
                        "[CustomerInput]"
                    ]
                }
            ],
            "updateCustomer": [
                2,
                {
                    "id": [
                        1,
                        "ID!"
                    ],
                    "first_name": [
                        3
                    ],
                    "last_name": [
                        3
                    ],
                    "email": [
                        3
                    ],
                    "address": [
                        3
                    ],
                    "zipcode": [
                        3
                    ],
                    "city": [
                        3
                    ],
                    "avatar": [
                        3
                    ],
                    "birthday": [
                        3
                    ],
                    "first_seen": [
                        4
                    ],
                    "last_seen": [
                        4
                    ],
                    "has_ordered": [
                        5
                    ],
                    "latest_purchase": [
                        3
                    ],
                    "has_newsletter": [
                        5
                    ],
                    "groups": [
                        3,
                        "[String]"
                    ],
                    "nb_commands": [
                        6
                    ],
                    "total_spent": [
                        7
                    ]
                }
            ],
            "removeCustomer": [
                2,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "createCategory": [
                12,
                {
                    "name": [
                        3,
                        "String!"
                    ]
                }
            ],
            "createManyCategory": [
                12,
                {
                    "data": [
                        23,
                        "[CategoryInput]"
                    ]
                }
            ],
            "updateCategory": [
                12,
                {
                    "id": [
                        1,
                        "ID!"
                    ],
                    "name": [
                        3
                    ]
                }
            ],
            "removeCategory": [
                12,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "createProduct": [
                11,
                {
                    "category_id": [
                        1,
                        "ID!"
                    ],
                    "reference": [
                        3,
                        "String!"
                    ],
                    "width": [
                        7,
                        "Float!"
                    ],
                    "height": [
                        7,
                        "Float!"
                    ],
                    "price": [
                        7,
                        "Float!"
                    ],
                    "thumbnail": [
                        3,
                        "String!"
                    ],
                    "image": [
                        3,
                        "String!"
                    ],
                    "description": [
                        3,
                        "String!"
                    ],
                    "stock": [
                        6,
                        "Int!"
                    ]
                }
            ],
            "createManyProduct": [
                11,
                {
                    "data": [
                        24,
                        "[ProductInput]"
                    ]
                }
            ],
            "updateProduct": [
                11,
                {
                    "id": [
                        1,
                        "ID!"
                    ],
                    "category_id": [
                        1
                    ],
                    "reference": [
                        3
                    ],
                    "width": [
                        7
                    ],
                    "height": [
                        7
                    ],
                    "price": [
                        7
                    ],
                    "thumbnail": [
                        3
                    ],
                    "image": [
                        3
                    ],
                    "description": [
                        3
                    ],
                    "stock": [
                        6
                    ]
                }
            ],
            "removeProduct": [
                11,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "createCommand": [
                8,
                {
                    "reference": [
                        3,
                        "String!"
                    ],
                    "date": [
                        4,
                        "Date!"
                    ],
                    "customer_id": [
                        1,
                        "ID!"
                    ],
                    "basket": [
                        9,
                        "JSON!"
                    ],
                    "total_ex_taxes": [
                        7,
                        "Float!"
                    ],
                    "delivery_fees": [
                        7,
                        "Float!"
                    ],
                    "tax_rate": [
                        7,
                        "Float!"
                    ],
                    "taxes": [
                        7,
                        "Float!"
                    ],
                    "total": [
                        7,
                        "Float!"
                    ],
                    "status": [
                        3,
                        "String!"
                    ],
                    "returned": [
                        5,
                        "Boolean!"
                    ]
                }
            ],
            "createManyCommand": [
                8,
                {
                    "data": [
                        25,
                        "[CommandInput]"
                    ]
                }
            ],
            "updateCommand": [
                8,
                {
                    "id": [
                        1,
                        "ID!"
                    ],
                    "reference": [
                        3
                    ],
                    "date": [
                        4
                    ],
                    "customer_id": [
                        1
                    ],
                    "basket": [
                        9
                    ],
                    "total_ex_taxes": [
                        7
                    ],
                    "delivery_fees": [
                        7
                    ],
                    "tax_rate": [
                        7
                    ],
                    "taxes": [
                        7
                    ],
                    "total": [
                        7
                    ],
                    "status": [
                        3
                    ],
                    "returned": [
                        5
                    ]
                }
            ],
            "removeCommand": [
                8,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "createReview": [
                10,
                {
                    "date": [
                        4,
                        "Date!"
                    ],
                    "status": [
                        3,
                        "String!"
                    ],
                    "command_id": [
                        1,
                        "ID!"
                    ],
                    "product_id": [
                        1,
                        "ID!"
                    ],
                    "customer_id": [
                        1,
                        "ID!"
                    ],
                    "rating": [
                        6,
                        "Int!"
                    ],
                    "comment": [
                        3,
                        "String!"
                    ]
                }
            ],
            "createManyReview": [
                10,
                {
                    "data": [
                        26,
                        "[ReviewInput]"
                    ]
                }
            ],
            "updateReview": [
                10,
                {
                    "id": [
                        1,
                        "ID!"
                    ],
                    "date": [
                        4
                    ],
                    "status": [
                        3
                    ],
                    "command_id": [
                        1
                    ],
                    "product_id": [
                        1
                    ],
                    "customer_id": [
                        1
                    ],
                    "rating": [
                        6
                    ],
                    "comment": [
                        3
                    ]
                }
            ],
            "removeReview": [
                10,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "createSetting": [
                19,
                {
                    "configuration": [
                        9,
                        "JSON!"
                    ]
                }
            ],
            "createManySetting": [
                19,
                {
                    "data": [
                        27,
                        "[SettingInput]"
                    ]
                }
            ],
            "updateSetting": [
                19,
                {
                    "id": [
                        1,
                        "ID!"
                    ],
                    "configuration": [
                        9
                    ]
                }
            ],
            "removeSetting": [
                19,
                {
                    "id": [
                        1,
                        "ID!"
                    ]
                }
            ],
            "__typename": [
                3
            ]
        },
        "CustomerInput": {
            "id": [
                1
            ],
            "first_name": [
                3
            ],
            "last_name": [
                3
            ],
            "email": [
                3
            ],
            "address": [
                3
            ],
            "zipcode": [
                3
            ],
            "city": [
                3
            ],
            "avatar": [
                3
            ],
            "birthday": [
                3
            ],
            "first_seen": [
                4
            ],
            "last_seen": [
                4
            ],
            "has_ordered": [
                5
            ],
            "latest_purchase": [
                3
            ],
            "has_newsletter": [
                5
            ],
            "groups": [
                3
            ],
            "nb_commands": [
                6
            ],
            "total_spent": [
                7
            ],
            "__typename": [
                3
            ]
        },
        "CategoryInput": {
            "id": [
                1
            ],
            "name": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "ProductInput": {
            "id": [
                1
            ],
            "category_id": [
                1
            ],
            "reference": [
                3
            ],
            "width": [
                7
            ],
            "height": [
                7
            ],
            "price": [
                7
            ],
            "thumbnail": [
                3
            ],
            "image": [
                3
            ],
            "description": [
                3
            ],
            "stock": [
                6
            ],
            "__typename": [
                3
            ]
        },
        "CommandInput": {
            "id": [
                1
            ],
            "reference": [
                3
            ],
            "date": [
                4
            ],
            "customer_id": [
                1
            ],
            "basket": [
                9
            ],
            "total_ex_taxes": [
                7
            ],
            "delivery_fees": [
                7
            ],
            "tax_rate": [
                7
            ],
            "taxes": [
                7
            ],
            "total": [
                7
            ],
            "status": [
                3
            ],
            "returned": [
                5
            ],
            "__typename": [
                3
            ]
        },
        "ReviewInput": {
            "id": [
                1
            ],
            "date": [
                4
            ],
            "status": [
                3
            ],
            "command_id": [
                1
            ],
            "product_id": [
                1
            ],
            "customer_id": [
                1
            ],
            "rating": [
                6
            ],
            "comment": [
                3
            ],
            "__typename": [
                3
            ]
        },
        "SettingInput": {
            "id": [
                1
            ],
            "configuration": [
                9
            ],
            "__typename": [
                3
            ]
        }
    }
}