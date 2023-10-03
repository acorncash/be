async function updateMissions() {
    if($(".MC_01_chk:checked").length && confirm('선택된 미션을 수정하시겠습니까?')) {
        const data = new Map();

        $($(".MC_01_chk:checked")).each((idx, item) => {
            const row = $(item).parent().parent();
            const value = {}

            row.find('input[type=text], input[type=datetime]').each((vIdx, vItem) => {
                value[$(vItem).attr('class')] = $(vItem).val()
            })
            
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

function createMission(type) {
    const lastSeq = parseInt($('#MC_01_tbody').find('tr').last().find('.missionSeq').text()) + 1
    const row = $('<tr>' 
    + '<td><input type="checkbox" class="MC_01_chk"></td>'
    + `<td class="missionSeq">${lastSeq}</td>`
    + `<td><input type="text" class="missionType" style="width:20px" value="${type}" readonly></td>`
    + '<td><input type="text" class="title"/></td>'
    + '<td><input type="text" class="description"/></td>'
    + '<td><input type="text" class="url"/></td>'
    + '<td><input type="text" class="dotoli"/></td>'
    + '<td><input type="text" class="limitCount"/></td>'
    + '<td><input type="datetime" class="startAt"/></td>'
    + '<td><input type="datetime" class="endAt"/></td>'
    + '<td>0</td>'
    + '</tr>')

    $('#MC_01_tbody').append(row)
}