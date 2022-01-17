const maSVEl = document.querySelector('#txtMaSV')
const tenSVEl = document.querySelector('#txtTenSV')
const loaiSVEl = document.querySelector('#loaiSV')
const diemToanEL = document.querySelector('#txtDiemToan')
const diemVanEl = document.querySelector('#txtDiemVan')
const maSVOutputEl = document.querySelector('#spanMaSV')
const tenSVOutputEl = document.querySelector('#spanTenSV')
const loaiSVOutputEl = document.querySelector('#spanLoaiSV')
const diemTBOutputEL = document.querySelector('#spanDTB')
const xepLoaiSVOutputEl = document.querySelector('#spanXepLoai')


function HienThiThongTin() {
    let sinhVien = {
        maSV: maSVEl.value,
        tenSV: tenSVEl.value,
        loaiSV: loaiSVEl.value,
        diemToan: diemToanEL.value * 1,
        diemVan: diemVanEl.value * 1,
        diemTB: function () {
            return (this.diemToan + this.diemVan) / 2
        },
        xepLoai: function () {
            if (this.diemTB() >= 8)
                return 'Giỏi'
            else if (this.diemTB() >= 6.5)
                return 'Khá'
            else if (this.diemTB() >= 5)
                return 'Trung Bình'
            else return 'Yếu'
        }
    }
    maSVOutputEl.innerHTML = sinhVien.maSV
    tenSVOutputEl.innerHTML = sinhVien.tenSV
    loaiSVOutputEl.innerHTML = sinhVien.loaiSV
    diemTBOutputEL.innerHTML = sinhVien.diemTB()
    xepLoaiSVOutputEl.innerHTML = sinhVien.xepLoai()
}
