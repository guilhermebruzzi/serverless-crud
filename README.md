# Serverless CRUD

Serverless service which provides a basic CRUD scaffold.

## Installation

Make sure that you use Serverless v1.

1. Clone this repository
2. Execute `make setup`
3. Deploy with `make deploy`

## How to use

Simply perform requests against the exposed endpoints:

### Create

```bash
curl -X POST https://XXXX.execute-api.region.amazonaws.com/dev/todos --data '{ "body" : "Learn Serverless" }'
```

### Read all


```bash
curl https://XXXX.execute-api.region.amazonaws.com/dev/todos
```

### Read one

```bash
curl https://XXXX.execute-api.region.amazonaws.com/dev/todos/<id>
```

### Update

```bash
curl -X PUT https://XXXX.execute-api.region.amazonaws.com/dev/todos/<id> --data '{ "body" : "Understand Serverless" }'
```

### DELETE

```bash
curl -X DELETE https://XXXX.execute-api.region.amazonaws.com/dev/todos/<id>
```

## AWS services used

- Lambda
- API Gateway
- DynamoDB
