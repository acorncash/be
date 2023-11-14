async function updateMissions() {
    if($(".MC_01_chk:checked").length && confirm('선택된 미션을 수정하시겠습니까?')) {
        const data = new Map();

        $($(".MC_01_chk:checked")).each((idx, item) => {
            const row = $(item).parent().parent();
            const value = {}

            row.find('input[type=text], input[type=datetime], input[type=hidden], input[type=radio]:checked').each((vIdx, vItem) => {
                value[$(vItem).attr('class')] = $(vItem).val()
            })

            value['attendCount'] = row.find('.attendCount').text()
            
            data.set(row.find('.missionSeq').text(), value)
        });

        let response = await fetch(`/api/mission/rows`, {
            method: "put",
            cache: 'no-cache',
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(data))
        }).then(() => {
            alert("수정되었습니다.")
            location.reload()
        }).catch(() => {
            alert("오류가 발생하였습니다.")
        })
    }
}

async function uploadImage(seq, input) {
    let file = input.files[0]
    let data = new FormData()
    data.append("image", file);

    let reader = new FileReader(); 
    reader.onload = function(e) {

        $(input).prev('img').attr("src", e.target.result);
    }

    reader.readAsDataURL(file);

    let response = await fetch(`/api/mission/${seq}/image`, {
        method: "put",
        cache: 'no-cache',
        credentials: "same-origin",
        body: data
    }).then(() => {
        alert("사진이 변경되었습니다.")
        location.reload()
    }).catch(() => {
        alert("오류가 발생하였습니다.")
    })
}

function createMission(type) {
    const lastSeq = (parseInt($('#MC_01_tbody').find('tr').last().find('.missionSeq').text()) || 0) + 1
    const date = new Date()
    const currentDateTimeString = `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())} ${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;

    if (type != 'C') {
        const row = $('<tr>'
        + `<input type="hidden" class="missionType" value="${type}" readonly>`
        + '<td><input type="checkbox" class="MC_01_chk" checked></td>'
        + `<td class="missionSeq">${lastSeq}</td>`
        + '<td><input type="text" class="title"/></td>'
        + '<td><input type="text" class="description"/></td>'
        + '<td><input type="text" class="keyword"/></td>'
        + '<td><input type="text" class="price"/></td>'
        + '<td><input type="text" class="mall"/></td>'
        + '<td><input type="text" class="dotoli"/></td>'
        + '<td><input type="text" class="limitCount"/></td>'
        + `<td><input type="datetime" class="startAt" value="${currentDateTimeString}"/></td>`
        + `<td><input type="datetime" class="endAt" value="${currentDateTimeString}"/></td>`
        + `<td>
            <label><input th:name="snsType + ${lastSeq}" class="snsType" type="radio" value="0001" checked/>네이버</label>
            <label><input th:name="snsType + ${lastSeq}" class="snsType" type="radio" value="0002">인스타</label>
            <label><input th:name="snsType + ${lastSeq}" class="snsType" type="radio" value="0003">카카오</label>
            <label><input th:name="snsType + ${lastSeq}" class="snsType" type="radio" value="0004">무신사</label>
        </td>`
        + '<td class="attendCount">0</td>'
        + '</tr>')
        $('#MC_01_tbody').append(row)
    }
    if (type === 'C') {
        const row = $('<tr>'
        + `<input type="hidden" class="missionType" value="${type}" readonly>`
        + '<td><input type="checkbox" class="MC_01_chk" checked></td>'
        + `<td class="missionSeq">${lastSeq}</td>`
        + '<td><input type="text" class="title"/></td>'
        + '<td><input type="text" class="description"/></td>'
        + '<td><input type="text" class="url"/></td>'
        + '<td><input type="text" class="dotoli"/></td>'
        + '<td><input type="text" class="limitCount"/></td>'
        + `<td><input type="datetime" class="startAt" value="${currentDateTimeString}"/></td>`
        + `<td><input type="datetime" class="endAt" value="${currentDateTimeString}"/></td>`
        + `<td>
            <label><input th:name="snsType + ${lastSeq}" class="snsType" type="radio" value="0001" checked/>네이버</label>
            <label><input th:name="snsType + ${lastSeq}" class="snsType" type="radio" value="0002">인스타</label>
            <label><input th:name="snsType + ${lastSeq}" class="snsType" type="radio" value="0003">카카오</label>
            <label><input th:name="snsType + ${lastSeq}" class="snsType" type="radio" value="0004">무신사</label>
        </td>`
        + '<td class="attendCount">0</td>'
        + '</tr>')
        row.append(`<td>저장 후 사진선택이 가능합니다.</td>`)
        $('#MC_01_tbody').append(row)
    }


}

function pad2(n) {
    return (n < 10 ? '0' : '') + n;
}

async function confirmMission(confirmYn, missionSeq) {
    if (confirm(`선택된 미션을 ${confirmYn === 'Y' ? '승인' : '거절'}하시겠습니까?`)) {
        let response = await fetch(`/api/mission/capture/${missionSeq}/confirm?confirmYn=${confirmYn}`, {
            method: "put",
            cache: 'no-cache',
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(() => {
            alert("처리 되었습니다.")
            location.reload()
        }).catch(() => {
            alert("오류가 발생하였습니다.")
        })
    }
}