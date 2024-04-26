# GitConventon

> gitmoji

| Emoji | Description     | Emoji | Description           |
| --- |-----------------| -- |-----------------------|
| 🎨 | 코드의 형식 / 구조를 변경 | 🔨 | 코드를 리팩토링 할 때          |
| 💄 | UI / style 개선시  | 🔥 | 코드 또는 파일 제거할 때        |
| 📚 | 문서를 쓸 때         | 💎 | 버전 변경                 |
| 🚑 | 버그를 고칠 때        | ⚡️ | 새로운 코드/기능을 추가할때       |
| 🚜 | 파일 구조를 변경할 때    | 🚀 | 배포 / 개발 작업 과 관련된 모든 것 |
---

- Comit Message style

```bask
type : subject
```

- type
   - `Feat` : 새로운 기능 추가
   - `Fix` : 버그 수정
   - `Refactor` : 코드 리팩토링
   - `Create` : 파일 또는 폴더를 생성
   - `Change` : 파일 또는 폴더를 수정
- subject
   - 제목은 최대 50글자가 넘지 않도록 하고, 마침표 및 특수기호는 사용하지 않는다.
   - 영문으로 표기하는 경우 동사(원형)를 가장 앞에 두고 첫 글자는 대문자(과거 시제x)
   - 제목은 개조식 구문으로 작성 → 서술형 문장 x, 간결한 방식
```bash
- Fixed (x) -> Fix
- Added (x) -> Add
- Modified (x) -> Modify
```
```bash
git add . && git commit -m "🚑Fix : startNavigation for Navigation"
```
- 예시 - 코드에서 startNavigation 기능이 작동하지 않아 뷰 이동이 안되는것을 고침
>[!참고]
>
> 사용한 모듈들을 아래에 기입하였음 (bun.js)

```bash
bun install
bun install --save-dev eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y
bun install @react-navigation/native
bun install @react-navigation/drawer
bun install @react-navigation/stack
bun install @react-navigation/bottom-tabs
bun install react-native-safe-area-context
bun install react-native-gesture-handler
bun install react-native-screens
bun install @react-native-community/masked-view
```
