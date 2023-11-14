async function updateCompanys() {
    if($(".MC_01_chk:checked").length && confirm('선택된 업체를 수정하시겠습니까?')) {
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

        let response = await fetch(`/api/company/rows`, {
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

function createCompany(type) {
    const lastSeq = (parseInt($('#MC_01_tbody').find('tr').last().find('.missionSeq').text()) || 0) + 1
    const date = new Date()
    const currentDateTimeString = `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())} ${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;

    const row = $('<tr>'
    + `<input type="hidden" class="missionType" value="${type}" readonly>`
    + '<td><input type="checkbox" class="MC_01_chk" checked></td>'
    + `<td class="missionSeq">${lastSeq}</td>`
    + '<td><input type="text" class="name"/></td>'
    + '<td><input type="text" class="mall"/></td>'
    + `<td><input type="datetime" class="createAt" value="${currentDateTimeString}"/></td>`
    + '</tr>')
    $('#MC_01_tbody').append(row)

}

function pad2(n) {
    return (n < 10 ? '0' : '') + n;
}