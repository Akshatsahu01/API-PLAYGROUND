function JavaScript(props) {
    return (
        <div>
            <pre>
{`async function getData() {
    try {
        const response = await fetch("${props.generatedUrl}");

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

getData();`}
            </pre>
        </div>
    );
}


function Java(props) {
    return (
        <div>
            <pre>
{`import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) {
        try {
            String url = "${props.generatedUrl}";

            HttpClient client = HttpClient.newHttpClient();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();

            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println(response.body());

        } catch (Exception error) {
            error.printStackTrace();
        }
    }
}`}
            </pre>
        </div>
    );
}


function Python(props) {
    return (
        <div>
            <pre>
{`import requests

url = "${props.generatedUrl}"

response = requests.get(url)

data = response.json()

print(data)`}
            </pre>
        </div>
    );
}


function Cpp(props) {
    return (
        <div>
            <pre>
{`#include <iostream>
#include <curl/curl.h>

int main() {
    CURL* curl;

    curl = curl_easy_init();

    if (curl) {
        curl_easy_setopt(curl, CURLOPT_URL, "${props.generatedUrl}");

        CURLcode result = curl_easy_perform(curl);

        if (result != CURLE_OK) {
            std::cout << "Request failed" << std::endl;
        }

        curl_easy_cleanup(curl);
    }

    return 0;
}`}
            </pre>
        </div>
    );
}


const LanguageComponents = {
    JavaScript: JavaScript,
    Java: Java,
    Python: Python,
    CPP: Cpp
};

export default LanguageComponents;