function formatRupiah(angka) {
    var formatter = new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0
    });
    let formattedValue = formatter.format(angka);

    return formattedValue;
}

export default formatRupiah;
