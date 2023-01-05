const groupBy = (dataForGroup: any, property: string) => {
  const reducedData = (
    dataForGroup.data ? dataForGroup.data : dataForGroup
  ).reduce((acc: any, obj: any) => {
    const key = obj[property].id;

    if (!acc[key]) {
      const name = obj[property].name;
      acc[key] = { name, data: [], dataCount: 0 };
    }
    acc[key].data.push(obj);
    acc[key].dataCount++;
    return acc;
  }, {});

  return reducedData;
};

export const nestGroupsBy = (dataForGroup: {}, keys: string[]) => {
  const properties: string[] = [...keys];

  if (properties.length === 1) {
    return groupBy(dataForGroup, properties[0] as string);
  }

  const property = properties.shift();
  const grouped = groupBy(dataForGroup, property as string);

  for (let key in grouped) {
    const groupedData = grouped.data ? grouped.data : grouped;
    const result = nestGroupsBy(grouped[key], properties);
    groupedData[key].data = result;
  }

  return grouped;
};
