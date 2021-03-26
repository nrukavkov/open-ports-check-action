# Action for checking is opened port or not

This action tries to connect to the port and return the result.

## Inputs

### `port`

**Required** Try to connect to this port or ports. 

### `host`

Connect to this hostname. Default `"localhost"`.

### `pause`

Pause (in milliseconds) before check. Default `0`.

### `reverse`

The result will be true if the port is not reachable. Default `"false"`.

### `needFail`

Fail action if the result is not fulfilled. Default `"false"`.

## Outputs

### `result`

True or false

## Example usage

### Fail a pipline if 80 or 443 is not opened. 

```yml
uses: nrukavkov/open-ports-check-action@v1
with:
  port: 80, 443
  host: 'google.com'
  pause: 1000
  needFail: 'true'
  reverse: 'false'
```

### Fail a pipline if one 80 or 443 is opened. 

```yml
uses: nrukavkov/open-ports-check-action@v1
with:
  port: 80, 443
  host: 'yandex.ru'
  pause: 1000
  needFail: 'true'
  reverse: 'true'
```
