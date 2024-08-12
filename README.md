# CDN-V2 - simple and fast cdn w/hono

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

To run:
```sh
bun run dev
```

open http://localhost:3000
