gcloud functions deploy weather-reporto ^
--gen2 ^
--region=europe-west6 ^
--runtime=go121 ^
--source=. ^
--entry-point=HelloHTTP ^
--trigger-http ^
--allow-unauthenticated ^
--ingress-settings=all