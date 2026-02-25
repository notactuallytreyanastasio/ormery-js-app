# ORMery JS Demo — Express + better-sqlite3

A retro-styled todo list app built with Express, EJS, and better-sqlite3, using the **Temper-compiled ORMery query builder** for schema definition, SELECT queries, and INSERT operations.

Port: **5006**

## How ORMery Is Vendored

The compiled ORMery library lives in `vendor/` with three subdirectories:

```
vendor/
  ormery/          ← the query builder
  std/             ← Temper standard library
  temper-core/     ← Temper runtime
```

These are referenced in `package.json` as `file:` protocol dependencies:

```json
{
  "type": "module",
  "dependencies": {
    "ormery": "file:./vendor/ormery",
    "@temperlang/core": "file:./vendor/temper-core",
    "@temperlang/std": "file:./vendor/std",
    "express": "^4.21.0",
    "better-sqlite3": "^11.0.0",
    "ejs": "^3.1.10"
  }
}
```

The app uses ESM (`"type": "module"`). Since better-sqlite3 is CommonJS-only, it's loaded via `createRequire`:

```javascript
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Database = require('better-sqlite3');
```

## How ORMery Is Used

### Schema Definition

From `app.js` — both schemas are defined at startup using ORMery's `schema()` and `field()` functions. `schema()` auto-adds an `id` primary key.

```javascript
import { schema, field, Query, InMemoryStore, toInsertSql } from 'ormery';

const store = new InMemoryStore(); // dummy store for SQL generation

const listSchema = schema("lists", [
  field("name", "String", false, false),
  field("created_at", "String", false, true),
]);

const todoSchema = schema("todos", [
  field("title", "String", false, false),
  field("completed", "Int", false, false),
  field("list_id", "Int", false, false),
  field("created_at", "String", false, true),
]);
```

### SELECT Queries (ORMery)

ORMery generates the SQL string via `Query.toSql().toString()`, then better-sqlite3 executes it:

```javascript
// GET /lists/:id — fetch a single list by ID
const listSql = new Query(listSchema, store)
  .where("id", "=", String(id)).toSql().toString();
const list = db.prepare(listSql).get();

// GET /lists/:id — fetch todos for a list, sorted
const todosSql = new Query(todoSchema, store)
  .where("list_id", "=", String(id))
  .orderBy("completed", "asc")
  .orderBy("created_at", "desc")
  .toSql().toString();
const todos = db.prepare(todosSql).all();

// POST /todos/:id/toggle — look up a todo before toggling
const todoSql = new Query(todoSchema, store)
  .where("id", "=", String(id)).toSql().toString();
const todo = db.prepare(todoSql).get();
```

### INSERT Operations (ORMery)

`toInsertSql()` takes a schema and a `Map` of column→value pairs, returns a `SqlFragment` with autoescaped values:

```javascript
// POST /lists — create a new list
const vals = new Map([["name", name]]);
const sql = toInsertSql(listSchema, vals).toString();
db.prepare(sql).run();

// POST /lists/:id/todos — create a new todo
const vals = new Map([["title", title], ["list_id", String(id)]]);
const sql = toInsertSql(todoSchema, vals).toString();
db.prepare(sql).run();
```

### Raw SQL (not supported by ORMery)

UPDATE, DELETE, JOINs, and aggregates use raw prepared statements:

```javascript
const stmts = {
  // Aggregate query with subqueries (ORMery doesn't support JOINs)
  allLists: db.prepare(`
    SELECT l.*,
      (SELECT COUNT(*) FROM todos WHERE list_id = l.id) AS todo_count,
      (SELECT COUNT(*) FROM todos WHERE list_id = l.id AND completed = 1) AS done_count
    FROM lists l ORDER BY l.created_at DESC
  `),
  // UPDATE (ORMery doesn't generate UPDATE)
  toggleTodo: db.prepare(
    'UPDATE todos SET completed = CASE WHEN completed = 1 THEN 0 ELSE 1 END WHERE id = ?'
  ),
  // DELETE (ORMery doesn't generate DELETE)
  deleteTodo: db.prepare('DELETE FROM todos WHERE id = ?'),
};
```

## Running

```bash
npm install
node app.js
# → Todo app running at http://localhost:5006
```
