import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import './Dock.css';

function DockItem({ children, className = '', onClick, mouseXY, spring, distance, magnification, baseItemSize, orientation, active }) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);
  const isVertical = orientation === 'vertical';

  const mouseDistance = useTransform(mouseXY, val => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: baseItemSize, height: baseItemSize };
    return isVertical
      ? val - rect.y - baseItemSize / 2
      : val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item${active ? ' dock-item-active' : ''} ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, child => cloneElement(child, { isHovered, orientation }))}
    </motion.div>
  );
}

function DockLabel({ children, className = '', orientation, ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);
  const isVertical = orientation === 'vertical';

  useEffect(() => {
    const unsub = isHovered.on('change', v => setIsVisible(v === 1));
    return () => unsub();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={isVertical ? { opacity: 0, x: -4 } : { opacity: 0, y: 4 }}
          animate={isVertical ? { opacity: 1, x: 0 }  : { opacity: 1, y: -10 }}
          exit={isVertical  ? { opacity: 0, x: -4 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.18 }}
          className={`dock-label${isVertical ? ' dock-label-right' : ''} ${className}`}
          role="tooltip"
          style={isVertical ? { y: '-50%' } : { x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 180,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 48,
  orientation = 'horizontal',
}) {
  const mouseXY = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const isVertical = orientation === 'vertical';

  const maxSize = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );

  const sizeRow = useTransform(isHovered, [0, 1], [panelHeight, maxSize]);
  const size = useSpring(sizeRow, spring);

  return isVertical ? (
    /* Vertical: spring-width outer so sidebar expands rightward on hover */
    <motion.div
      style={{ width: size, scrollbarWidth: 'none' }}
      className="dock-outer dock-outer-vertical"
    >
      <motion.div
        onMouseMove={e => { isHovered.set(1); mouseXY.set(e.pageY); }}
        onMouseLeave={() => { isHovered.set(0); mouseXY.set(Infinity); }}
        className={`dock-panel dock-panel-vertical ${className}`}
        style={{ width: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, i) => (
          <DockItem key={i} onClick={item.onClick} className={item.className ?? ''}
            mouseXY={mouseXY} spring={spring} distance={distance}
            magnification={magnification} baseItemSize={baseItemSize}
            orientation="vertical" active={item.active}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  ) : (
    /* Horizontal: no outer resize — items overflow upward, panel stays fixed */
    <div className={`dock-outer dock-outer-horizontal`}>
      <motion.div
        onMouseMove={e => { isHovered.set(1); mouseXY.set(e.pageX); }}
        onMouseLeave={() => { isHovered.set(0); mouseXY.set(Infinity); }}
        className={`dock-panel dock-panel-horizontal ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, i) => (
          <DockItem key={i} onClick={item.onClick} className={item.className ?? ''}
            mouseXY={mouseXY} spring={spring} distance={distance}
            magnification={magnification} baseItemSize={baseItemSize}
            orientation="horizontal" active={item.active}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}

