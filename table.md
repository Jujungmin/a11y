## table
table 확실하게 넘어가기
1. thead / tbody / tfoot
   - thaed 머리글 / tbody 본문 / tfoot 바닥글
   - thead, tfoot은 tobdy 앞 뒤로 한 번씩만 사용 가능.
   - thead, tfoot은 필요에 의해서 사용 가능.
   - tbody 태그는 필요하다.
2. colgroup span
   - col
3. col width
4. th scope
5. caption
6. rowspan / colspan
7. css table-layout : auto, fixed

``` html
<table>
    <colgroup>
        <col>
        <col>
        <col>
    </colgroup>
    <thead>
        <th scope="col">1</th>
        <th scope="col">2</th>
        <th scope="col">3</th>
    </thead>
    <tbody>
        <tr>
            <td>1-1</td>
            <td>2-1</td>
            <td>3-1</td>
        </tr>
        <tr>
            <td>1-2</td>
            <td>2-2</td>
            <td>3-2</td>
        </tr>
        <tr>
            <td>1-3</td>
            <td>2-3</td>
            <td>3-3</td>
        </tr>
    </tbody>
</table>
```