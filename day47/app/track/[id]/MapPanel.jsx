"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => <div className="h-80 animate-pulse rounded-xl bg-slate-100" aria-hidden="true" />,
});

export default function MapPanel(props) {
  return <DeliveryMap {...props} />;
}
