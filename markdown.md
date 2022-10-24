# 버블링과 캡처링
## e.target | e.currentTarget | this

### 버블링
한 요소에 이벤트가 발생 ==> 이 요소에 할당된 핸들러 동작 ==> 부모요소의 핸들러가 동작.<br/>
**가장 최상단의 조상요소를 만날 떄까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작**

[예제] `FORM > DIV > P`형태로 중첩된 구조, 요소 각각 핸들러가 할당.
``` html
<form onclick="alert('form')">FORM
	<div onclick="alert('div')">DIV
		<p onclick="alert('p')">P</p>
	</div>
</form>
```
- 결과
	- `<p>`요소르 클릭하면 `p` -> `div` -> `form` 순서로 3개의 얼럿창이 뜬다.
	- 이런 현상을 __이벤트 버블링(bubbling)__이라 부른다.

- 정리
	- 거의 모든 이벤트는 버블링이 된다.<br>`focus`이벤트와 같이 버블링되지 않는 이벤트도 있으나 몇몇 이벤트를 제외하곤 대부분의 이벤트는 버블링이 된다.

### event.target
부모요소의 핸들러는 이벤트가 정확히 어디서 발생했는지 알 수 있다.
- `eventtarget`과 `this(=event.currentTarget)`의 차이점
	- `event.target`은 실제 이벤트가 시작된 __'타깃'__ 요소이다. 버블링이 진행되어도 변하지 않는다.
	- `this`는 __'현재'__요소로, 현재 실행 중인 핸들러가 할당된 요소를 참조한다.

### 버블링 중단하기
이벤트 버블링은 타깃 이벤트에서 시작해서 `<html>`요소를 거쳐 `document`객체를 만늘 때까지 각 노드에서 모두 발생한다. 몇몇 이벤트는 `window`객체까지 거슬러 올라가기도 한다. 이때도 모든 핸들러가 호출된다.
<br/>
그런데 핸들러에게 이벤트를 완전히 처리하고 난 후 버블링을 중단하도록 명령할 수 있다.
``` html
<body onclick="alert('버블링은 여기까지 도달하지못합니다.')">
	<!-- e.stopPropagation()를 사용하면 된다. -->
	<!-- <button>을 클릭해도 body.onclick은 동작하지 않는다. -->
	<button onclick="event.stopPropagation()">클릭해주세요</button>
</body>
```
> event.stopImmediatePropagation()
> - 한 요소의 특정 이벤트를 처리하는 핸들러가 여러개일 때, 핸들러 중 하나가 버블링을 멈추더라도 나머지 핸들러는 여전히 동작한다.


### 캡처링
