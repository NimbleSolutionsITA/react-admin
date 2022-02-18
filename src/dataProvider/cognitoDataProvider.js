import { stringify } from 'query-string';
import { fetchUtils, DataProvider } from 'ra-core';

/**
 * Maps react-admin queries to a simple REST API
 *
 * This REST dialect is similar to the one of FakeRest
 *
 * @see https://github.com/marmelab/FakeRest
 *
 * @example
 *
 * getList     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * getOne      => GET http://my.api.url/posts/123
 * getMany     => GET http://my.api.url/posts?filter={id:[123,456,789]}
 * update      => PUT http://my.api.url/posts/123
 * create      => POST http://my.api.url/posts
 * delete      => DELETE http://my.api.url/posts/123
 *
 * @example
 *
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 * import simpleRestProvider from 'ra-data-simple-rest';
 *
 * import { PostList } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={simpleRestProvider('http://path.to.my.api/')}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 *
 * export default App;
 */
export default (
    apiUrl,
    httpClient = fetchUtils.fetchJson,
    countHeader = 'Content-Range'
) => ({
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const query = {
            sort: JSON.stringify([field, order]),
            page,
            perPage,
            filter: JSON.stringify(params.filter),
            // range: JSON.stringify([rangeStart, rangeEnd]),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        let options

        let tokenArray = JSON.parse(localStorage.getItem('tokenObj'))

        if (!(page in tokenArray)) {
            tokenArray[page] = localStorage.getItem('pagToken')
            localStorage.setItem("tokenObj",JSON.stringify(tokenArray))
        }

        options = {
            method: 'POST',
            body: JSON.stringify({
                token : localStorage.getItem('pagToken') || '',
                tokenArray
            })
        }

        return httpClient(url, options).then(({ headers, json }) => {

            localStorage.setItem("pagToken", headers.get('pagination-token'))

            if (!headers.has(countHeader)) {
                throw new Error(
                    `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
                );
            }
            return {
                data: json,
                total:
                    countHeader === 'Content-Range'
                        ? parseInt(
                            headers.get('content-range').split('/').pop(),
                            10
                        )
                        : parseInt(headers.get(countHeader.toLowerCase())),
            };
        });
    }
});