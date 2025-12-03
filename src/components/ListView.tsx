import React from "react";
import { useTranslation } from 'react-i18next'
import { Site } from "../types/site";

interface ListViewProps {
  sites: Site[];
}

const ListView: React.FC<ListViewProps> = ({ sites }) => {
  const { t } = useTranslation()
  
  return (
    <ul className="divide-y divide-gray-200">
      {sites.map((site) => (
        <li key={site.id} className="py-4 flex items-center">
          <img src={site.image} alt={t(`sites:${site.id}.name`)} className="w-16 h-16 rounded mr-4 object-cover" />
          <div>
            <h3 className="text-lg font-semibold">{t(`sites:${site.id}.name`)}</h3>
            <p className="text-gray-500">{t(`sites:${site.id}.description`)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListView;
