/*
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
 */

const path = require('path')
const express = require('express')
const http = require('http')
const app = express()

app.use(express.static(path.join(__dirname, 'dist')))

/*
* Status endpoint
*/
app.get( "/actuator/health", ( request, response, next) => {
        response.json({"status": "UP"})
    }
)

/*
* Provide global variables to the frontend app from dynamically included server environment variables
*/
app.get( "/customization.js", ( request, response, next) => {
        response.header("Content-Type", "application/javascript")
        response.header("Cache-Control", "no-cache")
        response.header("robots", "no-cache")
        response.send(
            `const APIMAP_API_URL="${process.env.APIMAP_API_URL}"; \n`+
            `const APIMAP_DEVELOPER_URL="${process.env.APIMAP_DEVELOPER_URL}";\n`+
            `const APIMAP_SUPPORT="${process.env.APIMAP_SUPPORT}";\n`+
            `const APIMAP_TITLE="${process.env.APIMAP_TITLE}";\n`+
            `document.title="${process.env.APIMAP_TITLE}";`
        )
    }
)

/*
* Provide customizable content
*/
app.get("/content/metadata-options.json", function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/content/metadata-options.json'));
    }
)

app.get("/content/search-options.json", function(req, res) {
        res.sendFile(path.join(__dirname + '/dist/content/search-options.json'));
    }
)

app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname + '/dist/index.html'));
    }
)

const server = http.createServer(app)

const hostname = "0.0.0.0"
const port = 8080

server.listen(port, hostname);
console.log('Running on ' + hostname + ":" + port)