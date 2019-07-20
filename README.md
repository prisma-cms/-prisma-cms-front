See [instruction](https://github.com/prisma-cms/boilerplate#readme) for install.

## ToDo

### Fix onSchemaLoad

Если схема отсутствует (например, в режиме разработки обновили страницу и с сервера не пришла схема (ошибка соединения)),
в этот момент при сохранении объектов выполняется обновление состояния и возникает ситуация обновления состояний нескольких
объектов с возникновением ошибки.
Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state

В принципе, не критично, но немного неприятно.