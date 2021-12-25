import { Statistic, StatisticProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { formatDoubleRender } from '../util';

interface ITimeStatistic {
	value: number;
}

const TimeStatistic: React.FC<ITimeStatistic & StatisticProps> = props => {
	const [time, setTime] = useState('00天 00小时00分钟00秒');

	useEffect(() => {
	  let timer = setInterval(() => {
			const duration = Date.now() - props.value;
			const day = Math.floor(duration / 1000 / 60 / 60 / 24);
			const hour = Math.floor((duration / 1000 / 60 / 60) % 60);
			const minute = Math.floor((duration / 1000 / 60) % 60);
			const seconds = Math.floor((duration / 1000) % 60);
			setTime(
				`${formatDoubleRender(day)}天 ${formatDoubleRender(
					hour
				)}小时${formatDoubleRender(minute)}分钟${formatDoubleRender(seconds)}秒`
			);
		}, 1000);

    return () => {
      clearInterval(timer);
    }
	}, [props.value]);

  let _props = {
    ...props,
    value: time
  };

	return (
		<Statistic
      {..._props}
		/>
	);
};


export default TimeStatistic;