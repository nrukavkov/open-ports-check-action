# Port Reachable javascript action

This action try to connect to port and return result.

## Inputs

### `port`

**Required** Connect to this port. Default `"World"`.

### `host`

Connect to this hostname. Default `"localhost"`.

### `reverse`

Result will be true if port is not reachable. Default `"false"`.

### `needFail`

Fail action if the result is not fulfilled . Default `"false"`.

## Outputs

### `result`

True or false

## Example usage

```yml
uses: nrukavkov/open-ports-check-action@v1
with:
  port: 80, 443
  host: 'google.com'
  needFail: 'true'
  reverse: 'false'
```