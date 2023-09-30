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