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
  - [X] タスクの削除 /delete-task
    - [X] タスク削除ボタンの追加
    - [X] 削除リクエストの送信
  - [X] タスク一覧 /task-list
    - [X] 全タスクの取得をバックエンドに頼む
    - [X] 取得したタスクを並べる
  - [ ] タスクの完了/未完了の実装
- バックエンド
  - [X] 追加されたタスクをデータベースに書き込み /add-task
  - [X] 削除リスクのあったタスクを削除 /delete-task
  - [X] 全タスクの取得 /get-tasks
  - [ ] タスクの完了/未完了を実装する
