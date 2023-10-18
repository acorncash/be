async function removeNotice(seq) {
    if (confirm(`삭제 하시겠습니까?`)) {
        let response = await fetch(`/api/config/${seq}`, {
            method: "delete",
            cache: 'no-cache',
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(() => {
            alert("삭제 되었습니다.")
            location.href = "/config/notice"
        }).catch(() => {
            alert("오류가 발생하였습니다.")
        })
    }
}