function getBodyJson(requestBody) {
    return JSON.stringify(requestBody, null, 2);
}

function JavaScript({ generatedUrl, method, requestBody }) {
    const bodyOptions = requestBody === undefined
        ? ""
        : `\n        headers: { "Content-Type": "application/json" },\n        body: JSON.stringify(${getBodyJson(requestBody).replace(/\n/g, "\n        ")})`;

    return (
        <pre>{`async function sendRequest() {
    try {
        const response = await fetch(${JSON.stringify(generatedUrl)}, {
            method: ${JSON.stringify(method)},${bodyOptions}
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Request failed:", error);
    }
}

sendRequest();`}</pre>
    );
}

function Java({ generatedUrl, method, requestBody }) {
    const requestBuilder = method === "GET"
        ? ".GET()"
        : method === "DELETE"
            ? ".DELETE()"
            : `.header("Content-Type", "application/json")\n                    .method("${method}", HttpRequest.BodyPublishers.ofString(${JSON.stringify(JSON.stringify(requestBody))}))`;

    return (
        <pre>{`import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(${JSON.stringify(generatedUrl)}))
                    ${requestBuilder}
                    .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(
                    request, HttpResponse.BodyHandlers.ofString());

            System.out.println(response.body());
        } catch (Exception error) {
            error.printStackTrace();
        }
    }
}`}</pre>
    );
}

function Python({ generatedUrl, method, requestBody }) {
    const bodyArgument = requestBody === undefined
        ? ""
        : `,\n    json=json.loads(${JSON.stringify(JSON.stringify(requestBody))})`;

    return (
        <pre>{`import json
import requests

url = ${JSON.stringify(generatedUrl)}
response = requests.request(
    ${JSON.stringify(method)},
    url${bodyArgument}
)

print(response.status_code)
print(response.json())`}</pre>
    );
}

function Cpp({ generatedUrl, method, requestBody }) {
    const bodySetup = requestBody === undefined
        ? ""
        : `\n        const char* body = ${JSON.stringify(JSON.stringify(requestBody))};\n        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);\n        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, body);`;
    const headerSetup = requestBody === undefined
        ? ""
        : "\n        struct curl_slist* headers = nullptr;\n        headers = curl_slist_append(headers, \"Content-Type: application/json\");";
    const cleanup = requestBody === undefined
        ? ""
        : "\n        curl_slist_free_all(headers);";

    return (
        <pre>{`#include <iostream>
#include <curl/curl.h>

int main() {
    CURL* curl = curl_easy_init();
    if (!curl) return 1;

    curl_easy_setopt(curl, CURLOPT_URL, ${JSON.stringify(generatedUrl)});
    curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, ${JSON.stringify(method)});${headerSetup}${bodySetup}

    CURLcode result = curl_easy_perform(curl);
    if (result != CURLE_OK) {
        std::cerr << "Request failed: " << curl_easy_strerror(result) << std::endl;
    }
${cleanup}
    curl_easy_cleanup(curl);
    return result == CURLE_OK ? 0 : 1;
}`}</pre>
    );
}

const LanguageComponents = {
    JavaScript,
    Java,
    Python,
    CPP: Cpp,
};

export default LanguageComponents;
