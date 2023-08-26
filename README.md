# todoApp-deno
## URL
[Deno Deploy](https://noto-todo-app.deno.dev)
## 使用技術
- HTML
- CSS
  - Bulma
- JavaScript
- Deno
- MongoDB

## TODO
- フロントエンド
  - [X] タスクの追加 /add-task
    - [X] UIの作成
    - [X] タスクを追加してバックエンドに投げる
  - [ ] タスクの削除 /delete-task
    - [ ] タスク削除ボタンの追加
    - [ ] 削除リクエストの送信
  - [X] タスク一覧 /task-list
    - [X] 全タスクの取得をバックエンドに頼む
    - [X] 取得したタスクを並べる
- バックエンド
  - [X] 追加されたタスクをデータベースに書き込み /add-task
  - [ ] 削除リスクのあったタスクを削除 /delete-task
  - [X] 全タスクの取得 /get-tasks
