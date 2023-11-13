gcloud functions deploy weather-status ^
--gen2 ^
--region=europe-west6 ^
--runtime=go121 ^
--source=. ^
--entry-point=helloHTTP ^
--trigger-http ^
--allow-unauthenticated