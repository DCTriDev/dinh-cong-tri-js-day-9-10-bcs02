let listSinhVien = []
const LOCAL_STORAGE = 'listSinhVienLocal'
const maSVEl = document.querySelector('#txtMaSV')
const tenSVEl = document.querySelector('#txtTenSV')
const emailEl = document.querySelector('#txtEmail')
const passEl = document.querySelector('#txtPass')
const ngaySinhEl = document.querySelector('#txtNgaySinh')
const khoaHocEl = document.querySelector('#khSV')
const diemToanEl = document.querySelector('#txtDiemToan')
const diemLyEl = document.querySelector('#txtDiemLy')
const diemHoaEl = document.querySelector('#txtDiemHoa')
const tbodySinhVienEl = document.querySelector('#tbodySinhVien')

let newListSinhVienData = localStorage.getItem(LOCAL_STORAGE)
let newListSV = JSON.parse(newListSinhVienData)
if (newListSV) {
    listSinhVien = newListSV.map(function (value) {
        return new SinhVien(value.maSV, value.tenSV, value.email, value.pass, value.ngaySinh, value.khoaHoc, value.diemToan, value.diemLy, value.diemHoa)
    })
    RenderTable(listSinhVien)
}

function ThemSinhVien() {
    let sinhVienNew = LayThongTinSV()
    if (CheckSV(sinhVienNew)) {
        listSinhVien.push(sinhVienNew)
        LuuLocal()
    }
    ResetInput()
    RenderTable(listSinhVien)
}

function SuaSV(maSV) {
    let viTri = TimViTri(maSV, listSinhVien)
    if (viTri !== -1) {
        let sv = listSinhVien[viTri]
        maSVEl.value = sv.maSV
        maSVEl.disabled = true
        tenSVEl.value = sv.tenSV
        emailEl.value = sv.email
        passEl.value = sv.pass
        ngaySinhEl.value = sv.ngaySinh
        khoaHocEl.value = sv.khoaHoc
        diemToanEl.value = sv.diemToan
        diemLyEl.value = sv.diemLy
        diemHoaEl.value = sv.diemHoa
    }
    LuuLocal()
    RenderTable(listSinhVien)
}

function TimSinhVien() {
    let tenSV = tenSVEl.value
    let sinhVienTimDuoc = []
    for (let i = 0; i < listSinhVien.length; i++) {
        let sv = listSinhVien[i]
        if (tenSV === sv.tenSV)
            sinhVienTimDuoc.push(sv)
    }
    RenderTable(sinhVienTimDuoc)
}

function RenderTable(arr) {
    let contentHTML = ''
    for (let i = 0; i < arr.length; i++) {
        let sv = arr[i]
        contentHTML += `
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.email}</td>
                <td>${sv.ngaySinh}</td>
                <td>${sv.khoaHoc}</td>
                <td>${sv.diemTB()}</td>
                <td>
                <button class="btn btn-success" onclick="SuaSV('${sv.maSV}')">Sửa</button>
                <button class="btn btn-danger" onclick="XoaSV('${sv.maSV}')">Xoá</button>
                </td>
            </tr>`
    }

    tbodySinhVienEl.innerHTML = contentHTML
}

function CheckSV(newSV) {
    for (let i = 0; i < listSinhVien.length; i++) {
        if (newSV.maSV === listSinhVien[i].maSV)
            return false
    }
    return true
}

function LayThongTinSV() {
    let maSV = maSVEl.value
    let tenSV = tenSVEl.value
    let email = emailEl.value
    let pass = passEl.value
    let ngaySinh = ngaySinhEl.value
    let khoaHoc = khoaHocEl.value
    let diemToan = diemToanEl.value * 1
    let diemLy = diemLyEl.value * 1
    let diemHoa = diemLyEl.value * 1

    return new SinhVien(maSV, tenSV, email, pass, ngaySinh, khoaHoc, diemToan, diemLy, diemHoa)
}

function TimViTri(maSV) {
    let viTri = -1
    for (let i = 0; i < listSinhVien.length; i++) {
        const sv = listSinhVien[i]
        if (sv.maSV === maSV)
            viTri = i
    }
    return viTri
}

function CapNhapSV() {
    let sv = LayThongTinSV()
    let viTri = TimViTri(sv.maSV)
    if (viTri !== -1) {
        listSinhVien[viTri] = sv
    }
    maSVEl.disabled = false
    ResetInput()
    LuuLocal()
    RenderTable(listSinhVien)
}

function XoaSV(maSV) {
    let viTri = TimViTri(maSV)
    if (viTri !== -1) {
        listSinhVien.splice(viTri, 1)
    }
    LuuLocal()
    RenderTable(listSinhVien)
}

function ResetInput() {
    maSVEl.value = ''
    tenSVEl.value = ''
    emailEl.value = ''
    passEl.value = ''
    ngaySinhEl.value = ''
    khoaHocEl.value = ''
    diemToanEl.value = ''
    diemLyEl.value = ''
    diemHoaEl.value = ''
}

function LuuLocal() {
    let listSVJSON = JSON.stringify(listSinhVien)
    localStorage.setItem(LOCAL_STORAGE, listSVJSON)
}