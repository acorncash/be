$(async function() {
    $('.withdrawYn').change(async function () {
        const seq = $(this).parents('tr').data('seq')
        const value = $(this).val()
    
        let response = await fetch(`/api/withdraw/${seq}/status/${value}`, {
            method: "put",
            cache: 'no-cache',
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            }
        })
    });
})