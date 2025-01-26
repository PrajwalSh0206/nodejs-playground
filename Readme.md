# Elasticsearch and Kibana Setup Guide

This guide provides steps to reset the `elastic` user password and generate an enrollment token for Kibana to connect to Elasticsearch in a secure environment. It is tailored for a Docker Compose setup.

---

## Prerequisites
- Docker and Docker Compose installed on your machine.
- A running Docker Compose setup for Elasticsearch and Kibana.

---

## Steps to Reset the `elastic` User Password

1. Ensure your Docker Compose services are running:
   ```bash
   docker-compose up -d
   ```

2. Identify the Elasticsearch container name or ensure it is named `es01` in your `docker-compose.yml`.

3. Execute the following command to reset the password for the `elastic` user:
   ```bash
   docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
   ```

4. The command will generate a new password and display it in the terminal. Note down this password for later use.

---

## Steps to Generate a Kibana Enrollment Token

1. Run the following command to generate a new enrollment token for Kibana:
   ```bash
   docker exec -it es01 /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
   ```

2. The command will output a token that looks like this:
   ```plaintext
   eyJ2ZXIiOiJ1cm4xIiwic2lnbmF0dXJlIjoi...
   ```
   Copy the entire token and save it temporarily.

---

## Using the Enrollment Token in Kibana

1. When setting up Kibana for the first time, it will prompt you for an enrollment token.
2. Paste the token generated in the previous step into the Kibana setup page.
3. Kibana will use the token to securely connect to Elasticsearch.

---

## Troubleshooting

### 1. Unable to Generate Token or Reset Password
- Ensure the Elasticsearch container is running:
  ```bash
  docker ps
  ```
- Check the Elasticsearch logs for errors:
  ```bash
  docker logs es01
  ```

### 2. Kibana Fails to Connect to Elasticsearch
- Verify that Kibana is configured with the correct Elasticsearch host and credentials.
- Check if the Elasticsearch service is accessible from Kibana:
  ```bash
  docker exec -it kibana curl -XGET http://es01:9200
  ```
- Inspect the Kibana logs for additional details:
  ```bash
  docker logs kibana
  ```

---

## Notes
- Always store passwords and enrollment tokens securely.
- Ensure both Elasticsearch and Kibana are running on the same network as defined in your `docker-compose.yml` file.

### Example Docker Compose Configuration
Here is an example `docker-compose.yml` for Elasticsearch and Kibana:

```yaml
version: '3.8'

services:
  es01:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.17.1
    environment:
      - discovery.type=single-node
      - xpack.security.enrollment.enabled=true
    ports:
      - "9200:9200"
      - "9300:9300"
    volumes:
      - esdata:/usr/share/elasticsearch/data
    networks:
      - esnet

  kibana:
    image: docker.elastic.co/kibana/kibana:8.6.2
    container_name: kibana
    environment:
      - ELASTICSEARCH_HOSTS=http://es01:9200
    ports:
      - "5601:5601"
    networks:
      - esnet
    depends_on:
      - es01

volumes:
  esdata:
    driver: local

networks:
  esnet:
    driver: bridge
```

For further details, refer to the official [Elasticsearch documentation](https://www.elastic.co/guide/index.html).

