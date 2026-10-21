import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Sektör liderleri ve mezunlarla kariyer söyleşileri.",
    capacity: 120,
    image: "/afis.svg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "2026-10-20",
    time: "10:30",
    location: "Mühendislik Lab 3",
    description: "Arduino ve temel robotik bileşenlerle uygulamalı prototipleme.",
    capacity: 30,
    image: "/afis-robotik.svg"
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Zirvesi",
    category: "Seminer",
    date: "2026-10-27",
    time: "13:00",
    location: "B Blok Amfi 1",
    description: "Web güvenliği, sızma testleri ve güvenli kodlama pratikleri.",
    capacity: 150,
    image: "/afis-siber.svg"
  },
  {
    id: "event-4",
    title: "Yapay Zeka ve Makine Öğrenmesi",
    category: "Atölye",
    date: "2026-11-05",
    time: "15:00",
    location: "Bilgisayar Lab 1",
    description: "Python ile veri analizi ve temel model eğitimi.",
    capacity: 40,
    image: "/afis-yapay-zeka.svg"
  },
  {
    id: "event-5",
    title: "Girişimcilik ve İnovasyon",
    category: "Söyleşi",
    date: "2026-11-15",
    time: "16:00",
    location: "Kütüphane Seminer Odası",
    description: "Start-up kurma süreçleri ve yatırım alma deneyimleri.",
    capacity: 60,
    image: "/afis-girisimcilik.svg"
  },
  {
    id: "event-6",
    title: "Açık Kaynak Hackathon",
    category: "Yarışma",
    date: "2026-11-28",
    time: "09:00",
    location: "Merkez Fuaye Alanı",
    description: "24 saatlik açık kaynak kod maratonu ve proje sunumları.",
    capacity: 80,
    image: "/afis-hackathon.svg"
  }
];
