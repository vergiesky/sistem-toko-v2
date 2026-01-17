from decimal import Decimal


def to_number(value):
    if isinstance(value, Decimal):
        return float(value)
    return value


def user_dict(user):
    return {
        "id_user": user.id_user,
        "username": user.username,
        "created_at": user.created_at.isoformat() if user.created_at else None,
        "updated_at": user.updated_at.isoformat() if user.updated_at else None,
    }


def customer_dict(customer):
    return {
        "id_customer": customer.id_customer,
        "nama_customer": customer.nama_customer,
        "nama_perusahaan": customer.nama_perusahaan,
        "alamat": customer.alamat,
        "created_at": customer.created_at.isoformat() if customer.created_at else None,
        "updated_at": customer.updated_at.isoformat() if customer.updated_at else None,
    }


def barang_harga_customer_dict(barang_harga_customer, include_barang=False, include_customer=False):
    data = {
        "id_barang_harga_customer": barang_harga_customer.id_barang_harga_customer,
        "id_barang": barang_harga_customer.id_barang,
        "id_customer": barang_harga_customer.id_customer,
        "harga_khusus": to_number(barang_harga_customer.harga_khusus),
        "created_at": barang_harga_customer.created_at.isoformat() if barang_harga_customer.created_at else None,
        "updated_at": barang_harga_customer.updated_at.isoformat() if barang_harga_customer.updated_at else None,
    }

    if include_barang and barang_harga_customer.barang:
        data["barang"] = barang_dict(barang_harga_customer.barang)
    if include_customer and barang_harga_customer.customer:
        data["customer"] = customer_dict(barang_harga_customer.customer)

    return data


def barang_dict(barang, include_prices=False):
    data = {
        "id_barang": barang.id_barang,
        "nama_barang": barang.nama_barang,
        "stok": barang.stok,
        "harga_tetap": to_number(barang.harga_tetap),
        "created_at": barang.created_at.isoformat() if barang.created_at else None,
        "updated_at": barang.updated_at.isoformat() if barang.updated_at else None,
    }

    if include_prices:
        data["barang_harga_customers"] = [
            barang_harga_customer_dict(item) for item in (barang.barang_harga_customers or [])
        ]

    return data


def detail_nota_dict(detail, include_barang=False):
    data = {
        "id_detail_nota": detail.id_detail_nota,
        "id_nota": detail.id_nota,
        "id_barang": detail.id_barang,
        "jumlah": detail.jumlah,
        "harga_satuan": to_number(detail.harga_satuan),
        "sub_total": to_number(detail.sub_total),
        "created_at": detail.created_at.isoformat() if detail.created_at else None,
        "updated_at": detail.updated_at.isoformat() if detail.updated_at else None,
    }

    if include_barang and detail.barang:
        data["barang"] = barang_dict(detail.barang)

    return data


def nota_dict(nota, include_customer=False, include_details=False, include_detail_barang=False):
    data = {
        "id_nota": nota.id_nota,
        "id_customer": nota.id_customer,
        "nama_customer": nota.nama_customer,
        "tanggal": nota.tanggal.isoformat() if nota.tanggal else None,
        "nomor_nota": nota.nomor_nota,
        "total": to_number(nota.total),
        "created_at": nota.created_at.isoformat() if nota.created_at else None,
        "updated_at": nota.updated_at.isoformat() if nota.updated_at else None,
    }

    if include_customer and nota.customer:
        data["customers"] = customer_dict(nota.customer)

    if include_details:
        data["detail_notas"] = [
            detail_nota_dict(detail, include_barang=include_detail_barang)
            for detail in (nota.detail_notas or [])
        ]

    return data
