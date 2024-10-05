# CDN-V2 - Fast file server w/hono

## これはなに

シンプルなファイルサーバーです。Cloudflareのキャッシュを活用してCDNとしても扱えます。
> [Sekai.CDN](https://github.com/TeamSekai/Sekai.CDN)の影響を受けて作られています。

フレームワークに超高速なHonoを採用しています。Expressなんかよりずっと早いです。

## 機能

* API(ファイル一覧等)
* ファイル配信
* ~~アップロード~~(私的利用なので実装は後回し。必要になったら用意します)

## developments

To install dependencies:
```sh
bun install
```

To configure:

1. create and open `config.json`,
2. edit like [this](https://github.com/ringo360/CDN-v2/blob/main/config.json.example)

To run:
```sh
bun run dev
```

open http://localhost:3000
